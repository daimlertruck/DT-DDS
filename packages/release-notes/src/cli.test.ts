import { readFileSync } from 'fs';

import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';

import { main } from './cli';
import { publishGitHubRelease } from './github-release';

jest.mock('fs');
jest.mock('./github-release');

describe('main', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    jest
      .mocked(readFileSync)
      .mockReturnValue(JSON.stringify({ version: '1.2.3' }));
    jest.mocked(publishGitHubRelease).mockResolvedValue(undefined);
  });

  afterEach(() => {
    process.exitCode = undefined;
  });

  it('should publish the umbrella package version', async () => {
    await main([]);

    const [path] = jest.mocked(readFileSync).mock.calls[0];
    expect(String(path)).toMatch(/packages\/dt-dds-react\/package\.json$/);
    expect(publishGitHubRelease).toHaveBeenCalledWith({
      version: '1.2.3',
      dryRun: false,
    });
  });

  it('should take the version from --tag', async () => {
    await main(['--tag', '@dt-dds/react@2.0.0']);

    expect(readFileSync).not.toHaveBeenCalled();
    expect(publishGitHubRelease).toHaveBeenCalledWith({
      version: '2.0.0',
      dryRun: false,
    });
  });

  it('should pass --dry-run on', async () => {
    await main(['--dry-run']);

    expect(publishGitHubRelease).toHaveBeenCalledWith({
      version: '1.2.3',
      dryRun: true,
    });
  });

  it('should reject a tag of another package', async () => {
    await main(['--tag', '@dt-dds/react-button@2.0.0']);

    expect(publishGitHubRelease).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      '--tag must look like @dt-dds/react@<version>, got @dt-dds/react-button@2.0.0'
    );
    expect(process.exitCode).toBe(1);
  });

  it('should set exit code 1 when publishing fails', async () => {
    jest
      .mocked(publishGitHubRelease)
      .mockRejectedValue(
        new Error('Tag @dt-dds/react@1.2.3 not found on origin')
      );

    await main([]);

    expect(console.error).toHaveBeenCalledWith(
      'Tag @dt-dds/react@1.2.3 not found on origin'
    );
    expect(process.exitCode).toBe(1);
  });
});
