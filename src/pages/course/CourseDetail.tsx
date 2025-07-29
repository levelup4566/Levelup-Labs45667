import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Clock,
  Users,
  Award,
  Star,
  BookOpen,
  Play,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Youtube,
  Code2,
  Palette,
  Brain,
  PlayCircle,
  ExternalLink,
  Check
} from 'lucide-react';

// Different playlist URLs based on time commitment
const playlistsByTimeCommitment = {
  minimal: {
    'html-css-mastery': {
      'HTML Fundamentals': 'https://youtube.com/playlist?list=PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB',
      'CSS Fundamentals': 'https://youtube.com/playlist?list=PLr6-GrHUlVf8JIgLcu3sHigvQjTw_aC9C',
      'CSS Layout - Flexbox': 'https://youtube.com/playlist?list=PLr6-GrHUlVf9RlGiXNUsI8G6sHtJDdDKQ',
      'CSS Grid Layout': 'https://youtube.com/playlist?list=PLr6-GrHUlVf8QSoeQdmAeq-vmYOGNL1mJ',
      'Responsive Design': 'https://youtube.com/playlist?list=PLZlA0Gpn_vH_2fqpffx9RmjuW4LI1F2TB',
      'CSS Animations': 'https://youtube.com/playlist?list=PLZlA0Gpn_vH8DJ2aBQZY-7Qv_bV-pOdSK',
      'Advanced CSS': 'https://youtube.com/playlist?list=PLZlA0Gpn_vH8YH8QlWa8d6t_8BhRNK7_4',
      'Final Project': 'https://youtube.com/playlist?list=PLZlA0Gpn_vH8mXD4E2tWdZVLfqjHLu_M2'
    },
    'javascript-essentials': {
      'JavaScript Basics': 'https://youtube.com/playlist?list=PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX',
      'Control Structures': 'https://youtube.com/playlist?list=PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX',
      'Functions': 'https://youtube.com/playlist?list=PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX',
      'Objects and Arrays': 'https://youtube.com/playlist?list=PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX',
      'DOM Manipulation': 'https://youtube.com/playlist?list=PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX',
      'ES6+ Features': 'https://youtube.com/playlist?list=PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX',
      'Asynchronous JavaScript': 'https://youtube.com/playlist?list=PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX',
      'Error Handling': 'https://youtube.com/playlist?list=PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX',
      'Working with APIs': 'https://youtube.com/playlist?list=PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX',
      'JavaScript Project': 'https://youtube.com/playlist?list=PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX'
    }
  },
  moderate: {
    'html-css-mastery': {
      'HTML Fundamentals': 'https://youtube.com/playlist?list=PLWKjhJtqVAbnQ048Pa8sAqJoVRhx8TJtM',
      'CSS Fundamentals': 'https://youtube.com/playlist?list=PLWKjhJtqVAbleDe2_ZqZjZr2w0z5B5NZy',
      'CSS Layout - Flexbox': 'https://youtube.com/playlist?list=PLWKjhJtqVAbmOC7pKaP4_XjCvZVc6Bm9G',
      'CSS Grid Layout': 'https://youtube.com/playlist?list=PLWKjhJtqVAbmiUw1_9bx5T3b6H9E7G3Q7',
      'Responsive Design': 'https://youtube.com/playlist?list=PLWKjhJtqVAbnQ048Pa8sAqJoVRhx8TJtM',
      'CSS Animations': 'https://youtube.com/playlist?list=PLWKjhJtqVAbleDe2_ZqZjZr2w0z5B5NZy',
      'Advanced CSS': 'https://youtube.com/playlist?list=PLWKjhJtqVAbmOC7pKaP4_XjCvZVc6Bm9G',
      'Final Project': 'https://youtube.com/playlist?list=PLWKjhJtqVAbmiUw1_9bx5T3b6H9E7G3Q7'
    },
    'javascript-essentials': {
      'JavaScript Basics': 'https://youtube.com/playlist?list=PLSQl0a2vh4HC-Zm3qC1PSLZEKh3F2nMVK',
      'Control Structures': 'https://youtube.com/playlist?list=PLSQl0a2vh4HC-Zm3qC1PSLZEKh3F2nMVK',
      'Functions': 'https://youtube.com/playlist?list=PLSQl0a2vh4HC-Zm3qC1PSLZEKh3F2nMVK',
      'Objects and Arrays': 'https://youtube.com/playlist?list=PLSQl0a2vh4HC-Zm3qC1PSLZEKh3F2nMVK',
      'DOM Manipulation': 'https://youtube.com/playlist?list=PLSQl0a2vh4HC-Zm3qC1PSLZEKh3F2nMVK',
      'ES6+ Features': 'https://youtube.com/playlist?list=PLSQl0a2vh4HC-Zm3qC1PSLZEKh3F2nMVK',
      'Asynchronous JavaScript': 'https://youtube.com/playlist?list=PLSQl0a2vh4HC-Zm3qC1PSLZEKh3F2nMVK',
      'Error Handling': 'https://youtube.com/playlist?list=PLSQl0a2vh4HC-Zm3qC1PSLZEKh3F2nMVK',
      'Working with APIs': 'https://youtube.com/playlist?list=PLSQl0a2vh4HC-Zm3qC1PSLZEKh3F2nMVK',
      'JavaScript Project': 'https://youtube.com/playlist?list=PLSQl0a2vh4HC-Zm3qC1PSLZEKh3F2nMVK'
    }
  },
  significant: {
    'html-css-mastery': {
      'HTML Fundamentals': 'https://youtube.com/playlist?list=PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB',
      'CSS Fundamentals': 'https://youtube.com/playlist?list=PLr6-GrHUlVf8JIgLcu3sHigvQjTw_aC9C',
      'CSS Layout - Flexbox': 'https://youtube.com/playlist?list=PLr6-GrHUlVf9RlGiXNUsI8G6sHtJDdDKQ',
      'CSS Grid Layout': 'https://youtube.com/playlist?list=PLr6-GrHUlVf8QSoeQdmAeq-vmYOGNL1mJ',
      'Responsive Design': 'https://youtube.com/playlist?list=PLZlA0Gpn_vH_2fqpffx9RmjuW4LI1F2TB',
      'CSS Animations': 'https://youtube.com/playlist?list=PLZlA0Gpn_vH8DJ2aBQZY-7Qv_bV-pOdSK',
      'Advanced CSS': 'https://youtube.com/playlist?list=PLZlA0Gpn_vH8YH8QlWa8d6t_8BhRNK7_4',
      'Final Project': 'https://youtube.com/playlist?list=PLZlA0Gpn_vH8mXD4E2tWdZVLfqjHLu_M2'
    },
    'javascript-essentials': {
      'JavaScript Basics': 'https://youtube.com/playlist?list=PLDyQo7g0_nsVHmyZtVBunfDP-WpyBOAwR',
      'Control Structures': 'https://youtube.com/playlist?list=PLDyQo7g0_nsVHmyZtVBunfDP-WpyBOAwR',
      'Functions': 'https://youtube.com/playlist?list=PLDyQo7g0_nsVHmyZtVBunfDP-WpyBOAwR',
      'Objects and Arrays': 'https://youtube.com/playlist?list=PLDyQo7g0_nsVHmyZtVBunfDP-WpyBOAwR',
      'DOM Manipulation': 'https://youtube.com/playlist?list=PLDyQo7g0_nsVHmyZtVBunfDP-WpyBOAwR',
      'ES6+ Features': 'https://youtube.com/playlist?list=PLDyQo7g0_nsVHmyZtVBunfDP-WpyBOAwR',
      'Asynchronous JavaScript': 'https://youtube.com/playlist?list=PLDyQo7g0_nsVHmyZtVBunfDP-WpyBOAwR',
      'Error Handling': 'https://youtube.com/playlist?list=PLDyQo7g0_nsVHmyZtVBunfDP-WpyBOAwR',
      'Working with APIs': 'https://youtube.com/playlist?list=PLDyQo7g0_nsVHmyZtVBunfDP-WpyBOAwR',
      'JavaScript Project': 'https://youtube.com/playlist?list=PLDyQo7g0_nsVHmyZtVBunfDP-WpyBOAwR'
    }
  },
  intensive: {
    'html-css-mastery': {
      'HTML Fundamentals': 'https://youtube.com/playlist?list=PLrAjfiVdNRcSxhGQQtS7E0Hhhn6hGRE2x',
      'CSS Fundamentals': 'https://youtube.com/playlist?list=PLrAjfiVdNRcSxhGQQtS7E0Hhhn6hGRE2x',
      'CSS Layout - Flexbox': 'https://youtube.com/playlist?list=PLrAjfiVdNRcSxhGQQtS7E0Hhhn6hGRE2x',
      'CSS Grid Layout': 'https://youtube.com/playlist?list=PLrAjfiVdNRcSxhGQQtS7E0Hhhn6hGRE2x',
      'Responsive Design': 'https://youtube.com/playlist?list=PLrAjfiVdNRcSxhGQQtS7E0Hhhn6hGRE2x',
      'CSS Animations': 'https://youtube.com/playlist?list=PLrAjfiVdNRcSxhGQQtS7E0Hhhn6hGRE2x',
      'Advanced CSS': 'https://youtube.com/playlist?list=PLrAjfiVdNRcSxhGQQtS7E0Hhhn6hGRE2x',
      'Final Project': 'https://youtube.com/playlist?list=PLrAjfiVdNRcSxhGQQtS7E0Hhhn6hGRE2x'
    },
    'javascript-essentials': {
      'JavaScript Basics': 'https://youtube.com/playlist?list=PLWKjhJtqVAbnSo8E4bHdFuWeFGTOdMx6a',
      'Control Structures': 'https://youtube.com/playlist?list=PLWKjhJtqVAbnSo8E4bHdFuWeFGTOdMx6a',
      'Functions': 'https://youtube.com/playlist?list=PLWKjhJtqVAbnSo8E4bHdFuWeFGTOdMx6a',
      'Objects and Arrays': 'https://youtube.com/playlist?list=PLWKjhJtqVAbnSo8E4bHdFuWeFGTOdMx6a',
      'DOM Manipulation': 'https://youtube.com/playlist?list=PLWKjhJtqVAbnSo8E4bHdFuWeFGTOdMx6a',
      'ES6+ Features': 'https://youtube.com/playlist?list=PLWKjhJtqVAbnSo8E4bHdFuWeFGTOdMx6a',
      'Asynchronous JavaScript': 'https://youtube.com/playlist?list=PLWKjhJtqVAbnSo8E4bHdFuWeFGTOdMx6a',
      'Error Handling': 'https://youtube.com/playlist?list=PLWKjhJtqVAbnSo8E4bHdFuWeFGTOdMx6a',
      'Working with APIs': 'https://youtube.com/playlist?list=PLWKjhJtqVAbnSo8E4bHdFuWeFGTOdMx6a',
      'JavaScript Project': 'https://youtube.com/playlist?list=PLWKjhJtqVAbnSo8E4bHdFuWeFGTOdMx6a'
    }
  }
};

// Time commitment UI configurations
const timeCommitmentConfig = {
  minimal: {
    name: 'Minimal Commitment',
    badge: { color: 'amber', text: 'Bite-sized Learning' },
    description: 'Short, focused lessons perfect for busy schedules',
    sessionLength: '15-30 min sessions',
    gradient: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    intensity: 'Casual Explorer'
  },
  moderate: {
    name: 'Moderate Commitment',
    badge: { color: 'blue', text: 'Balanced Learning' },
    description: 'Steady progress with comprehensive coverage',
    sessionLength: '30-60 min sessions',
    gradient: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    intensity: 'Consistent Learner'
  },
  significant: {
    name: 'Significant Commitment',
    badge: { color: 'green', text: 'Accelerated Learning' },
    description: 'In-depth exploration with hands-on projects',
    sessionLength: '1-2 hour sessions',
    gradient: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    intensity: 'Dedicated Student'
  },
  intensive: {
    name: 'Intensive Commitment',
    badge: { color: 'purple', text: 'Immersive Learning' },
    description: 'Comprehensive bootcamp-style learning experience',
    sessionLength: '2+ hour sessions',
    gradient: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    intensity: 'Power Learner'
  }
};

// Course modules data
const courseModules = {
  'html-css-mastery': {
    title: 'HTML & CSS Mastery',
    description: 'Master the fundamentals of web development with HTML5 and CSS3',
    duration: '12h 30m',
    level: 'Beginner',
    icon: Code2,
    gradient: 'from-blue-500 to-cyan-500',
    totalModules: 8,
    modules: [
      {
        id: 1,
        title: 'HTML Fundamentals',
        description: 'Learn the basics of HTML structure and semantic elements',
        duration: '2h 15m',
        topics: ['HTML Structure', 'Semantic Elements', 'Forms', 'Tables'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB',
        completed: false
      },
      {
        id: 2,
        title: 'CSS Fundamentals',
        description: 'Understanding CSS selectors, properties, and the box model',
        duration: '2h 30m',
        topics: ['CSS Selectors', 'Box Model', 'Typography', 'Colors'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8JIgLcu3sHigvQjTw_aC9C',
        completed: false
      },
      {
        id: 3,
        title: 'CSS Layout - Flexbox',
        description: 'Master modern layout techniques with Flexbox',
        duration: '1h 45m',
        topics: ['Flex Container', 'Flex Items', 'Alignment', 'Responsive Design'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf9RlGiXNUsI8G6sHtJDdDKQ',
        completed: false
      },
      {
        id: 4,
        title: 'CSS Grid Layout',
        description: 'Create complex layouts with CSS Grid',
        duration: '2h 0m',
        topics: ['Grid Container', 'Grid Items', 'Grid Areas', 'Advanced Layouts'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8QSoeQdmAeq-vmYOGNL1mJ',
        completed: false
      },
      {
        id: 5,
        title: 'Responsive Design',
        description: 'Make your websites work on all devices',
        duration: '1h 30m',
        topics: ['Media Queries', 'Mobile First', 'Viewport', 'Breakpoints'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8QSoeQdmAeq-vmYOGNL1mJ',
        completed: false
      },
      {
        id: 6,
        title: 'CSS Animations',
        description: 'Bring your designs to life with animations',
        duration: '1h 15m',
        topics: ['Transitions', 'Keyframes', 'Transform', 'Performance'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8QSoeQdmAeq-vmYOGNL1mJ',
        completed: false
      },
      {
        id: 7,
        title: 'Advanced CSS',
        description: 'CSS variables, functions, and modern techniques',
        duration: '1h 30m',
        topics: ['CSS Variables', 'Calc Function', 'CSS Modules', 'PostCSS'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8QSoeQdmAeq-vmYOGNL1mJ',
        completed: false
      },
      {
        id: 8,
        title: 'Final Project',
        description: 'Build a complete responsive website',
        duration: '45m',
        topics: ['Project Planning', 'Implementation', 'Testing', 'Deployment'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8QSoeQdmAeq-vmYOGNL1mJ',
        completed: false
      }
    ]
  },
  'javascript-essentials': {
    title: 'JavaScript Essentials',
    description: 'Learn modern JavaScript programming from basics to advanced concepts',
    duration: '18h 45m',
    level: 'Beginner',
    icon: Code2,
    gradient: 'from-yellow-500 to-orange-500',
    totalModules: 10,
    modules: [
      {
        id: 1,
        title: 'JavaScript Basics',
        description: 'Variables, data types, and basic operations',
        duration: '2h 30m',
        topics: ['Variables', 'Data Types', 'Operators', 'Basic I/O'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf96NLj3PQq-tmEB6woZjwEl',
        completed: false
      },
      {
        id: 2,
        title: 'Control Structures',
        description: 'Conditionals and loops in JavaScript',
        duration: '2h 0m',
        topics: ['If/Else', 'Switch', 'For Loops', 'While Loops'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf96NLj3PQq-tmEB6woZjwEl',
        completed: false
      },
      {
        id: 3,
        title: 'Functions',
        description: 'Function declarations, expressions, and arrow functions',
        duration: '2h 15m',
        topics: ['Function Declaration', 'Arrow Functions', 'Parameters', 'Return Values'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf96NLj3PQq-tmEB6woZjwEl',
        completed: false
      },
      {
        id: 4,
        title: 'Objects and Arrays',
        description: 'Working with complex data structures',
        duration: '2h 30m',
        topics: ['Object Literals', 'Array Methods', 'Object Methods', 'Destructuring'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf96NLj3PQq-tmEB6woZjwEl',
        completed: false
      },
      {
        id: 5,
        title: 'DOM Manipulation',
        description: 'Interact with HTML elements using JavaScript',
        duration: '2h 45m',
        topics: ['Element Selection', 'Event Handling', 'Dynamic Content', 'Form Handling'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf96NLj3PQq-tmEB6woZjwEl',
        completed: false
      },
      {
        id: 6,
        title: 'ES6+ Features',
        description: 'Modern JavaScript features and syntax',
        duration: '2h 0m',
        topics: ['Let/Const', 'Template Literals', 'Modules', 'Classes'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf96NLj3PQq-tmEB6woZjwEl',
        completed: false
      },
      {
        id: 7,
        title: 'Asynchronous JavaScript',
        description: 'Promises, async/await, and handling asynchronous operations',
        duration: '2h 30m',
        topics: ['Callbacks', 'Promises', 'Async/Await', 'Fetch API'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf96NLj3PQq-tmEB6woZjwEl',
        completed: false
      },
      {
        id: 8,
        title: 'Error Handling',
        description: 'Debugging and error handling techniques',
        duration: '1h 30m',
        topics: ['Try/Catch', 'Error Objects', 'Debugging Tools', 'Testing'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf96NLj3PQq-tmEB6woZjwEl',
        completed: false
      },
      {
        id: 9,
        title: 'Working with APIs',
        description: 'Fetching and working with external data',
        duration: '2h 0m',
        topics: ['REST APIs', 'JSON', 'HTTP Methods', 'API Authentication'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf96NLj3PQq-tmEB6woZjwEl',
        completed: false
      },
      {
        id: 10,
        title: 'JavaScript Project',
        description: 'Build a complete JavaScript application',
        duration: '45m',
        topics: ['Project Setup', 'Implementation', 'Testing', 'Deployment'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf96NLj3PQq-tmEB6woZjwEl',
        completed: false
      }
    ]
  },
  'react-complete-guide': {
    title: 'React.js Complete Guide',
    description: 'Master React.js from components to advanced patterns',
    duration: '25h 15m',
    level: 'Intermediate',
    icon: Code2,
    gradient: 'from-cyan-500 to-blue-500',
    totalModules: 12,
    modules: [
      {
        id: 1,
        title: 'React Fundamentals',
        description: 'Components, JSX, and the React ecosystem',
        duration: '2h 30m',
        topics: ['Components', 'JSX', 'Props', 'React Environment'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8BB6tnzbO4jTTXx_2-kW4r',
        completed: false
      },
      {
        id: 2,
        title: 'State Management',
        description: 'Managing component state with useState hook',
        duration: '2h 15m',
        topics: ['useState Hook', 'State Updates', 'Event Handling', 'Controlled Components'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8BB6tnzbO4jTTXx_2-kW4r',
        completed: false
      },
      {
        id: 3,
        title: 'Component Lifecycle',
        description: 'Understanding component lifecycle and useEffect',
        duration: '2h 45m',
        topics: ['useEffect Hook', 'Cleanup Functions', 'Dependencies', 'Side Effects'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8BB6tnzbO4jTTXx_2-kW4r',
        completed: false
      },
      {
        id: 4,
        title: 'Props and Component Communication',
        description: 'Passing data between components',
        duration: '2h 0m',
        topics: ['Props Drilling', 'Callback Props', 'Children Props', 'Component Composition'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8BB6tnzbO4jTTXx_2-kW4r',
        completed: false
      },
      {
        id: 5,
        title: 'Lists and Keys',
        description: 'Rendering dynamic lists and understanding keys',
        duration: '1h 30m',
        topics: ['Map Function', 'Keys', 'Dynamic Lists', 'Conditional Rendering'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8BB6tnzbO4jTTXx_2-kW4r',
        completed: false
      },
      {
        id: 6,
        title: 'Forms and Input Handling',
        description: 'Working with forms in React',
        duration: '2h 15m',
        topics: ['Controlled Inputs', 'Form Validation', 'Form Libraries', 'Custom Hooks'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8BB6tnzbO4jTTXx_2-kW4r',
        completed: false
      },
      {
        id: 7,
        title: 'React Router',
        description: 'Client-side routing in React applications',
        duration: '2h 30m',
        topics: ['Route Setup', 'Navigation', 'Parameters', 'Nested Routes'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8BB6tnzbO4jTTXx_2-kW4r',
        completed: false
      },
      {
        id: 8,
        title: 'Context API',
        description: 'Global state management with Context',
        duration: '2h 0m',
        topics: ['Context Creation', 'Provider Pattern', 'useContext Hook', 'State Management'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8BB6tnzbO4jTTXx_2-kW4r',
        completed: false
      },
      {
        id: 9,
        title: 'Custom Hooks',
        description: 'Creating reusable custom hooks',
        duration: '1h 45m',
        topics: ['Hook Rules', 'Custom Hook Creation', 'Sharing Logic', 'Hook Libraries'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8BB6tnzbO4jTTXx_2-kW4r',
        completed: false
      },
      {
        id: 10,
        title: 'Performance Optimization',
        description: 'Optimizing React application performance',
        duration: '2h 30m',
        topics: ['React.memo', 'useMemo', 'useCallback', 'Code Splitting'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8BB6tnzbO4jTTXx_2-kW4r',
        completed: false
      },
      {
        id: 11,
        title: 'Testing React Components',
        description: 'Unit and integration testing for React',
        duration: '2h 15m',
        topics: ['Jest', 'React Testing Library', 'Component Testing', 'Mock Functions'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8BB6tnzbO4jTTXx_2-kW4r',
        completed: false
      },
      {
        id: 12,
        title: 'React Project',
        description: 'Build a complete React application',
        duration: '1h 0m',
        topics: ['Project Architecture', 'Best Practices', 'Deployment', 'Optimization'],
        playlistUrl: 'https://youtube.com/playlist?list=PLr6-GrHUlVf8BB6tnzbO4jTTXx_2-kW4r',
        completed: false
      }
    ]
  }
};

const CourseDetail = () => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract time commitment from URL parameters or default to 'moderate'
  const searchParams = new URLSearchParams(location.search);
  const timeCommitment = searchParams.get('timeCommitment') || 'moderate';
  const timeConfig = timeCommitmentConfig[timeCommitment as keyof typeof timeCommitmentConfig];

  let course = courseModules[courseSlug as keyof typeof courseModules];

  // Add playlist URLs based on time commitment
  if (course && timeCommitment && playlistsByTimeCommitment[timeCommitment as keyof typeof playlistsByTimeCommitment]) {
    const playlistMap = playlistsByTimeCommitment[timeCommitment as keyof typeof playlistsByTimeCommitment][courseSlug as keyof typeof playlistsByTimeCommitment.minimal];
    if (playlistMap) {
      course = {
        ...course,
        modules: course.modules.map(module => ({
          ...module,
          playlistUrl: playlistMap[module.title as keyof typeof playlistMap] || module.playlistUrl
        }))
      };
    }
  }

  // State to track module completion
  const [moduleCompletions, setModuleCompletions] = useState<{[key: number]: boolean}>(
    course ? course.modules.reduce((acc, module) => {
      acc[module.id] = module.completed;
      return acc;
    }, {} as {[key: number]: boolean}) : {}
  );

  // Function to toggle module completion
  const toggleModuleCompletion = (moduleId: number) => {
    setModuleCompletions(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Course Not Found</h1>
          <p className="text-slate-600">The requested course doesn't exist.</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const Icon = course.icon;
  const completedModules = Object.values(moduleCompletions).filter(Boolean).length;
  const progressPercentage = (completedModules / course.totalModules) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learning Path
          </Button>
          
          <div className="text-center">
            <div className="space-y-3 mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-200 text-slate-700 text-sm font-semibold">
                <Icon className="w-4 h-4 mr-2 text-blue-500" />
                {course.level} Course
              </div>

              {timeConfig && (
                <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${timeConfig.gradient}/10 border ${
                  timeConfig.badge.color === 'amber' ? 'border-amber-200' :
                  timeConfig.badge.color === 'blue' ? 'border-blue-200' :
                  timeConfig.badge.color === 'green' ? 'border-green-200' :
                  'border-purple-200'
                } text-slate-700 text-sm font-semibold ml-3`}>
                  <Clock className={`w-4 h-4 mr-2 ${
                    timeConfig.badge.color === 'amber' ? 'text-amber-500' :
                    timeConfig.badge.color === 'blue' ? 'text-blue-500' :
                    timeConfig.badge.color === 'green' ? 'text-green-500' :
                    'text-purple-500'
                  }`} />
                  {timeConfig.badge.text}
                </div>
              )}
            </div>
            
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r ${course.gradient} bg-clip-text text-transparent`}>
              {course.title}
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-4">
              {course.description}
            </p>

            {timeConfig && (
              <div className={`max-w-2xl mx-auto p-4 rounded-lg ${timeConfig.bgColor} border border-slate-200 mb-8`}>
                <div className="text-center">
                  <h3 className="font-semibold text-slate-900 mb-2">{timeConfig.name} Path</h3>
                  <p className="text-sm text-slate-700 mb-2">{timeConfig.description}</p>
                  <div className="flex items-center justify-center gap-4 text-xs text-slate-600">
                    <span>💡 {timeConfig.sessionLength}</span>
                    <span>🎯 {timeConfig.intensity}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-5 h-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <BookOpen className="w-5 h-5" />
                <span>{course.totalModules} Modules</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Award className="w-5 h-5" />
                <span>{course.level}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Progress</span>
                <span>{completedModules}/{course.totalModules} modules</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Course Modules</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Complete each module in order to build your skills progressively
            </p>
          </div>

          <div className="space-y-6">
            {course.modules.map((module, index) => (
              <Card key={module.id} className="hover:shadow-lg transition-all duration-300 border border-slate-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm
                          ${moduleCompletions[module.id] ? 'bg-green-500' : 'bg-slate-400'}
                        `}>
                          {moduleCompletions[module.id] ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            module.id
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-xl font-semibold text-slate-900">
                            Module {module.id}: {module.title}
                          </CardTitle>
                          <p className="text-slate-600 text-sm mt-1">{module.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-600 ml-13">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {module.duration}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="hover:bg-red-50 hover:border-red-200 hover:text-red-700"
                      >
                        <a
                          href={module.playlistUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Youtube className="w-4 h-4" />
                          {timeConfig ? `${timeConfig.badge.text} Playlist` : 'YouTube Playlist'}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>

                      <button
                        onClick={() => toggleModuleCompletion(module.id)}
                        className={`
                          flex items-center justify-center w-10 h-10 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:scale-105
                          ${moduleCompletions[module.id]
                            ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-200'
                            : 'bg-white border-slate-300 text-slate-400 hover:border-green-400 hover:text-green-500'
                          }
                        `}
                        title={moduleCompletions[module.id] ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        <Check className={`w-5 h-5 transition-all duration-200 ${moduleCompletions[module.id] ? 'scale-100' : 'scale-0'}`} />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 ml-13">
                    {module.topics.map((topic, topicIndex) => (
                      <Badge key={topicIndex} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r ${course.gradient}`}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Begin with Module 1 and work your way through each lesson at your own pace
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100">
              <Play className="w-5 h-5 mr-2" />
              Start Module 1
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <BookOpen className="w-5 h-5 mr-2" />
              Download Syllabus
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;
