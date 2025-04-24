# PolyProfile - Employee Profile Page

A dynamic employee profile page built with React, TypeScript, and Tailwind CSS. This application allows employees to view and edit their personal and professional information in a modern, interactive interface.

## Features

- **Responsive Design**: Adapts to all screen sizes for optimal viewing experience
- **Dark/Light Mode**: User-selectable theme preference
- **Interactive Components**: Including skills radar chart, timeline, and project display
- **Edit Mode**: Seamless switching between view and edit modes
- **Rich Data Visualization**: Visual representation of skills, timeline, and collaborations

## Project Structure

The project is structured as follows:

- `/src`: Source code
  - `/components`: React components
  - `/data`: Data models and mock data

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd employee-profile
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## API Design

The application is designed to interact with a backend API. Here are the key endpoints:

- **GET /api/employees/:id** - Retrieve employee information
  - Response: Employee object with all related data

- **PUT /api/employees/:id** - Update employee information
  - Request: Modified employee data
  - Response: Updated employee object

- **PUT /api/employees/:id/skills** - Update employee skills
  - Request: Array of skill objects
  - Response: Updated skills array

- **PUT /api/employees/:id/timeline** - Update career timeline
  - Request: Array of timeline event objects
  - Response: Updated timeline array

- **PUT /api/employees/:id/projects** - Update project information
  - Request: Array of project objects
  - Response: Updated projects array

## Technology Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Tailwind CSS for styling
  - Chart.js for data visualization
  - React Icons for iconography
  - Framer Motion for animations
  - date-fns for date manipulation

## Future Enhancements

- Authentication and authorization
- Profile image upload
- Notification system for profile updates
- Team view to explore colleagues' profiles
- Export profile as PDF/resume

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Employee page

Build a employee page to show and edit the employee info. One inspirations is [Polywork](https://www.polywork.com/).

# Instructions

You only need to build a single page to display a particular employee info and allow the employee to edit the page. At the same time, please define the APIs for interaction with the backend, facilitating future expansion and third-party integration.

# Minimum Requirements

1. A UI to display the employee info.
1. Support changing the employee info.

The requirements are intentionally simple and vague, please think a bit further about what you expect the user to view and edit the employee info.

# Good to have

### Tech Stack

The tech stuch should be TypeScript, React and Tailwind CSS since that's the one you will work with after join. So you may try to get a sense beforehand.

1. Frontend - TypeScript, React, Tailwind CSS.
2. Backend - Go if you have pure backend background. If you have more frontend background, node is perfectly fine. It's also totally fine if your solution doesn't involve backend at all.

### Features

We don't require any additional features. If you have more time, we recommend you to polish those minimum requirements. But if you can't resist the temptation, just go ahead and surprise us.

# Deliverables

Instruction on how to download the code and run locally.



员工页面

构建一个员工页面来展示和编辑员工信息。灵感来源之一是Polywork。

需求说明
你只需构建一个单页面来展示特定员工信息并允许员工编辑该页面。同时请定义与后端交互的API接口，便于未来扩展和第三方集成。

最低要求
展示员工信息的UI界面

支持修改员工信息

需求故意设计得简单模糊，请进一步思考你希望用户如何查看和编辑员工信息。

加分项
技术栈
技术栈应使用TypeScript、React和Tailwind CSS，因为这将是入职后主要使用的技术。可以借此提前熟悉。

前端 - TypeScript, React, Tailwind CSS

后端 - 纯后端背景建议用Go，前端背景较多用Node也可行。完全不涉及后端也是可以接受的

功能特性
不强制要求附加功能。若时间充裕，建议优化基本需求。但若灵感迸发，欢迎自由发挥给我们惊喜。

交付物
关于如何下载代码并在本地运行的说明。
