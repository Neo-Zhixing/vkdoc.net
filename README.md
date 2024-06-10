# VulkanHub
Better Vulkan Documentation starts here

VulkanHub is a project that takes the official Vulkan documentation and transforms it into a more user-friendly and accessible website. Our goal is to make learning Vulkan easier and more enjoyable for developers of all levels.

## Features
- Improved Navigation: VulkanHub provides a more intuitive navigation system compared to the official documentation, allowing you to quickly find the information you need.
- Enhanced Search: Our robust search functionality lets you easily locate specific topics within the Vulkan documentation.
- Dark Mode: I want my dark mode.
- Quickly looking up validation error codes: The validation layers gives you an error code `VUID-vkCmdClearDepthStencilImage-imageLayout-parameter`. Simply put that into the search box, and we will take you to exactly where it's defined.

## Development
Make sure to install the dependencies:

```bash
pnpm install
```

Start the development server on http://localhost:3000

```bash
pnpm run dev
```

VulkanHub is currently under development. Website contents are automatically generated from
the [official documentation](https://github.com/KhronosGroup/Vulkan-Docs) and the `vk.xml` file.

If there are any errors in the generation process, please open an issue and we will take a look.

## License
VulkanHub is licensed under the MIT License.
