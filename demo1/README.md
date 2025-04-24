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



Ա��ҳ��

����һ��Ա��ҳ����չʾ�ͱ༭Ա����Ϣ�������Դ֮һ��Polywork��

����˵��
��ֻ�蹹��һ����ҳ����չʾ�ض�Ա����Ϣ������Ա���༭��ҳ�档ͬʱ�붨�����˽�����API�ӿڣ�����δ����չ�͵��������ɡ�

���Ҫ��
չʾԱ����Ϣ��UI����

֧���޸�Ա����Ϣ

���������Ƶü�ģ�������һ��˼����ϣ���û���β鿴�ͱ༭Ա����Ϣ��

�ӷ���
����ջ
����ջӦʹ��TypeScript��React��Tailwind CSS����Ϊ�⽫����ְ����Ҫʹ�õļ��������Խ����ǰ��Ϥ��

ǰ�� - TypeScript, React, Tailwind CSS

��� - ����˱���������Go��ǰ�˱����϶���NodeҲ���С���ȫ���漰���Ҳ�ǿ��Խ��ܵ�

��������
��ǿ��Ҫ�󸽼ӹ��ܡ���ʱ���ԣ�������Ż��������󡣵�����бŷ�����ӭ���ɷ��Ӹ����Ǿ�ϲ��

������
����������ش��벢�ڱ������е�˵����
