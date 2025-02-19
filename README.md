# Next.js Job Search App

This is a job search platform built with **Next.js**. It allows users to search for jobs based on location, license type, endorsements, and travel preferences. The app features an intuitive navigation bar, dynamic filtering options, and a user-friendly interface.

## Features:
- Job search with filterable options (location, license type, endorsements, etc.)
- Admin panel (coming soon)
- Mobile-responsive navigation with a hamburger menu
- Dynamic rendering of job listings based on search criteria
- Easy-to-use filtering by CDL license type and endorsements

## Getting Started

Follow these steps to get the project up and running locally.

### 1. Clone the repository

Start by cloning this repository to your local machine:

```bash
git clone https://github.com/yourusername/job-search-app.git
cd job-search-app
 ``` 

### Install the necessary dependencies for the project using your preferred package manager:
npm install
# or
yarn install
# or
pnpm install

### Make sure to configure your environment variables. Create a .env.local file in the root directory of the project and add the following variables:
DATABASE_URL="your-database-url"  # Your database URL (if applicable)
NEXT_PUBLIC_API_URL="your-api-url"  # Your backend API URL (if applicable)

### Now you can start the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
