import { generateAnimations } from '../theme-generator/generators/animations';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation();
  jest.spyOn(console, 'warn').mockImplementation();
  jest.spyOn(console, 'error').mockImplementation();
});

describe('animations generator', () => {
  describe('generateAnimations', () => {
    it('should generate animations from tokens', () => {
      const result = generateAnimations();
      expect(result).toContain('export const animations');
      expect(result).toContain('emphasizedDecelerate: {');
      expect(result).toContain("duration: '300ms'");
      expect(result).toContain(
        "timingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)'"
      );
    });

    it('should generate consistent animation structure', () => {
      const result = generateAnimations();
      expect(result).toContain(
        "import { CustomTheme as Theme } from '../../types';"
      );
      expect(result).toContain("export const animations: Theme['animations']");
      expect(result).toContain('as const;');
    });

    it('should include proper TypeScript typing', () => {
      const result = generateAnimations();
      expect(result).toContain('CustomTheme as Theme');
      expect(result).toContain("Theme['animations']");
    });

    it('should generate valid JavaScript object', () => {
      const result = generateAnimations();
      // Extract the object part and verify it's valid
      const objectMatch = result.match(
        /export const animations: Theme\['animations'\] = ({[\s\S]*?}) as const;/
      );
      expect(objectMatch).toBeTruthy();

      if (objectMatch) {
        const objectString = objectMatch[1];
        expect(objectString).toContain('emphasizedDecelerate');
        expect(objectString).toContain('duration');
        expect(objectString).toContain('timingFunction');
      }
    });
  });
});
