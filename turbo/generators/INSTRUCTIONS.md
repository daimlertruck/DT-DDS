# Adding a New Custom Generator to the Daimler Truck Digital Design System

## Creating a New Generator

If you want to add another custom generator to the DT-DDS Design System, follow these simple steps:

1. **Directory Structure:**

   - Inside the `generators` directory, create a new folder with the name of your new generator (e.g., `custom-generator`).
   - Add the following files to the new folder:
     - `generator.ts`: Contains the generator logic, including prompt and action definitions.
     - `actions.ts`: Contains actions specific to your generator.
     - `templates/`: This folder contains templates for the files that will be generated.

2. **Adding to the Project:**

   - Open the `generators/config.ts` file.
   - Import the new generator like this:

     ```typescript
     import { newCustomGenerator } from './new-custom-generator/generator';
     ```

   - Next, add the new generator to the `generators` array in the same file:
     ```typescript
     export const generators = [
       // ... other generators ...
       newCustomGenerator,
     ];
     ```

3. **Running the New Generator:**

   - In the terminal, navigate to the root of your DT-DDS project.
   - Run the command:
     ```bash
     turbo gen new-custom-generator
     ```
   - Follow the interactive prompts to provide the necessary details for the new generator.
   - You can add the new generator to the package.json scripts, to normalise the way scripts are used.

4. **Review and Adjustments:**
   - After running the generator, review the generated files in the new folder.
   - Make adjustments as necessary to meet the specific needs of the new generator.

For technical documentation about how to implement a custom generator to meet your goal please check the [plop's offical documentation](https://plopjs.com/documentation/).

The `new-component-package` generator pins `@dt-dds/react-core` and `@dt-dds/themes` in the generated `package.json` to their workspace versions at generation time.
