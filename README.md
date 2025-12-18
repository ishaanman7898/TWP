# VE Wellness Blue
**Current Version: v1.9.0**

This repository contains the source code for **VE Wellness Blue** e-commerce website, built with **React**, **Vite**, **Tailwind CSS**, and **shadcn/ui**. It provides a premium shopping experience for wellness products.

## Changelog

### v1.9.0 - Supabase Tweaks and General Product Management Updates
- **Enhanced Product Management:**
  - Added drag-and-drop variant ordering that works regardless of Sort By filter
  - Implemented hover up/down arrows for manual reordering in list view
  - Added order numbers on cards in manual mode (grid and list views)
  - Auto-saves variant order immediately on drag/drop to Supabase
  - Fixed edit buttons to properly open product edit modal
  - Improved filter UI/UX with better spacing and visual hierarchy

- **Storefront Integration:**
  - Fixed color swatches to display properly on all product pages
  - Ensured swatches follow variant_order set in ProductManagement
  - Updated ProductLineSection to normalize Supabase fields and sort by variant_order
  - Made Accessories page pull from Supabase instead of static data
  - All product line pages now reflect admin ordering changes

- **Database:**
  - Added variant_order column to products table for persistent variant ordering
  - Full SQL provided for Supabase implementation

## Project Structure

*   **/src**: Contains the main application source code (components, pages, hooks, contexts, etc.).
*   **/public**: Static assets (images, fonts, etc.).
*   **/cart**: (If applicable) Subdirectory for any backend or microservices included in the monorepo.

## Getting Started

Follow these steps to set up the project locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd ve-wellness-blue-main
    ```

2.  **Install dependencies:**
    Run `npm install` to automatically install all required packages listed in `package.json`.
    ```bash
    npm install
    ```

3.  **Run the development server:**
    Start the local development server to view the website.
    ```bash
    npm run dev
    ```
    The site will typically be available at `http://localhost:5173`.

## Features

*   **Modern Design:** Built with Tailwind CSS and shadcn/ui for a sleek, responsive interface.
*   **Product Catalog:** Browse products by category (Water Bottles, Supplements, Accessories, Bundles).
*   **Shopping Cart:** Fully functional cart with persistent state.
*   **Responsive:** Optimized for mobile, tablet, and desktop devices.

## License

[MIT License](LICENSE) (or specify your license here)
