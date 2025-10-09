export interface ProblemStatement {
  code: string;
  title: string;
  category: string[];
  by: string;
  description: string;
  solution: string;
}

export const problemStatements: ProblemStatement[] = [
  {
    code: "PS-1",
    title: "Smart Business Follow-up & Payment Tracker",
    category: ["AI", "Web Development", "App Development"],
    by: "Anjali Infcocom India",
    description: "Small and medium businesses struggle to manage customer follow-ups, overdue payments, and communication because they rely on manual methods like Excel, WhatsApp, or paper notes. This leads to missed opportunities, delayed collections, and inefficient customer engagement.",
    solution: "A lightweight, AI-powered mobile and web app that automates follow-ups, tracks payments, and manages customer communication with smart reminders, simple dashboards, and WhatsApp/SMS/email integration—making business operations easy, affordable, and efficient."
  },
  {
    code: "PS-2",
    title: "Cloud-based Inventory & Stock Management",
    category: ["Cloud Computing"],
    by: "Anjali Infcocom India",
    description: "Small retailers and distributors often lose sales or overstock products because they don’t have real-time visibility of inventory. Manual tracking leads to errors, wastage, and financial loss.",
    solution: "A simple cloud-based inventory management app with barcode/QR scanning, low-stock alerts, and automatic reorder suggestions. Accessible via mobile, integrated with sales records for real-time accuracy."
  },
  {
    code: "PS-3",
    title: "SafeSpace – Cybersecurity for Women & Children",
    category: ["Cybersecurity", "Mobile Development", "IoT"],
    by: "ADSC",
    description: "Design and prototype a technological solution—either a mobile or app-based tool, a hardware device, or AI-enabled system—that improves the safety and security of women and children in cyberspace. This can include features such as distress alerts, malicious behavior detection, location-based notifications, privacy protections, or behavior analysis. The scope is open: it could focus on peer-to-peer communication, anonymity detection, or emergent threats like deepfakes, as long as it's aimed at protecting vulnerable groups online.",
    solution: "Build a mobile app that:\n  Allows users to send a one-tap emergency alert to predefined contacts, along with real-time GPS location.\n Incorporates AI-based detection to flag potentially harmful content (such as cyberbullying, grooming attempts, or harassment) and deliver warnings or blocks.\n Includes privacy protection features like disguised modes or quick exits.\n Optionally integrates with hardware (wearables, panic buttons) for offline alerting or sensor-based triggers."
  },
  {
    code: "PS-4",
    title: "Blockchain-based Ethical Supply Chain Tracking",
    category: ["Blockchain"],
    by: "AU Placement Cell",
    description: "Supply chains often lack transparency, making it difficult to verify whether products are ethically sourced.",
    solution: "Develop a blockchain-powered system that tracks the origin and journey of products (e.g., agricultural produce) and displays ethical sourcing details to end users."
  },
  {
    code: "PS-5",
    title: "Gamified Budgeting App for Youth",
    category: ["App Development", "Game Development"],
    by: "AU Placement Cell",
    description: "Young people struggle with savings, expense tracking, and financial literacy.",
    solution: "Build a gamified mobile app that rewards users for saving money, tracking expenses, and learning about financial management through challenges and rewards."
  },
  {
    code: "PS-6",
    title: "Smart Waste Bin System",
    category: ["IoT", "AI"],
    by: "AU Placement Cell",
    description: "Urban waste management is inefficient, with manual sorting leading to poor recycling rates.",
    solution: "Create an IoT-based smart waste bin using sensors and ML to auto-sort and recycle waste."
  },
  {
    code: "PS-7",
    title: "Energy Usage Dashboard with Predictions",
    category: ["IoT", "AI", "Web Development"],
    by: "AU Placement Cell",
    description: "Building energy consumption is often unoptimized, leading to wastage.",
    solution: "Build a dashboard that uses IoT sensors to monitor building energy usage and provide predictive insights to reduce consumption."
  },
  {
    code: "PS-8",
    title: "Smart Irrigation System",
    category: ["IoT", "AI"],
    by: "AU Placement Cell",
    description: "Farmers face water wastage due to inefficient irrigation.",
    solution: "Build a system that combines soil moisture sensors and weather predictions to optimize water usage for farms."
  },
  {
    code: "PS-9",
    title: "Carbon Footprint Tracker",
    category: ["App Development", "AI"],
    by: "AU Placement Cell",
    description: "Individuals lack visibility into their personal carbon footprint.",
    solution: "Develop an app that tracks travel, energy, and consumption patterns, then suggests eco-friendly alternatives."
  },
  {
    code: "PS-10",
    title: "Explainable AI Model",
    category: ["AI"],
    by: "AU Placement Cell",
    description: "AI models act as black boxes, limiting trust and adoption.",
    solution: "Build a small ML model with an explainability module that shows why decisions are made, visualizing features used."
  },
  {
    code: "PS-11",
    title: "Bias Detection Tool",
    category: ["AI"],
    by: "AU Placement Cell",
    description: "Datasets often contain hidden biases that can harm AI outcomes.",
    solution: "Create a tool that detects biases (gender, age, race) and suggests strategies to mitigate them."
  },
  {
    code: "PS-12",
    title: "AI-powered News Verifier",
    category: ["AI"],
    by: "AU Placement Cell",
    description: "Fake news spreads rapidly online.",
    solution: "Build an AI system that checks credibility of news by cross-referencing with trusted sources."
  },
  {
    code: "PS-13",
    title: "Digital Twin for Environmental Monitoring",
    category: ["IoT"],
    by: "AU Placement Cell",
    description: "Small structures lack real-time monitoring for energy and environment.",
    solution: "Develop a digital twin of a lab/classroom to track temp, humidity, and energy usage."
  },
  {
    code: "PS-14",
    title: "Predictive Maintenance System",
    category: ["IoT", "AI"],
    by: "AU Placement Cell",
    description: "Machinery failures cause downtime and losses.",
    solution: "Build a system that uses sensor data to predict failures and trigger alerts."
  },
  {
    code: "PS-15",
    title: "Smart Traffic Flow Monitor",
    category: ["IoT", "AI"],
    by: "AU Placement Cell",
    description: "Urban areas face heavy traffic with limited monitoring.",
    solution: "Implement a system using sensors to track traffic flow with simple visualization dashboards."
  },
  {
    code: "PS-16",
    title: "Fall Detection for Elderly",
    category: ["IoT", "AI", "App Development"],
    by: "AU Placement Cell",
    description: "Elderly individuals face risks from unattended falls.",
    solution: "Create a wearable system that detects falls and sends alerts to caregivers."
  },
  {
    code: "PS-17",
    title: "Emotion/Stress Detection App",
    category: ["AI", "App Development", "Web Developement"],
    by: "AU Placement Cell",
    description: "Stress levels are hard to monitor in real time.",
    solution: "Develop an app that uses voice/text cues or facial analysis to detect stress and suggest relaxation techniques."
  },
  {
    code: "PS-18",
    title: "Remote Health Monitoring Dashboard",
    category: ["IoT", "App Developement", "Web Developement"],
    by: "AU Placement Cell",
    description: "Chronic disease patients need continuous monitoring.",
    solution: "Build a dashboard that tracks vitals like blood sugar/heart rate with alert notifications."
  },
  {
    code: "PS-19",
    title: "Real-time Bill Splitter / Shared Expenses App",
    category: ["App Developement", "Web Developement"],
    by: "AU Placement Cell",
    description: "Splitting expenses among groups is often messy.",
    solution: "Develop an app that automatically calculates and manages shared expenses in real time."
  },
  {
    code: "PS-20",
    title: "AR/VR Simulations for Labs & Machines",
    category: ["AR / VR"],
    by: "AU Placement Cell",
    description: "Students lack hands-on access to real machines and labs.",
    solution: "Build AR/VR simulations of virtual labs, structures, or machines for training."
  },
  {
    code: "PS-21",
    title: "Gamified Coding App",
    category: ["App Developement", "Game Developement"],
    by: "AU Placement Cell",
    description: "Students find coding/problem-solving learning boring.",
    solution: "Build a gamified app with coding challenges, puzzles, and competitive problem-solving."
  },
  {
    code: "PS-22",
    title: "Adaptive AI Quiz Engine",
    category: ["Web Development", "App Developement", "AI"],
    by: "AU Placement Cell",
    description: "Traditional quizzes fail to identify and address student weaknesses.",
    solution: "Create an AI-powered quiz platform that adapts questions and provides feedback based on learner’s performance."
  },
  {
    code: "PS-23",
    title: "AI-powered Safety & Surveillance",
    category: ["IoT", "AI"],
    by: "AU Placement Cell",
    description: "Accidents and unsafe activities are not detected early.",
    solution: "Create AI solutions like sensor-based accident prevention (Mech), crack/damage detection (Civil), fault detection (Electrical), and video analytics for fights/fires (IT)."
  },
  {
    code: "PS-24",
    title: "Smart Mobility & EV Assist",
    category: ["EV", "IoT", "App Developement", "Web Developement"],
    by: "AU Placement Cell",
    description: "EV adoption faces challenges like charging and route optimization.",
    solution: "Develop low-cost EV charging hardware (Mech), smart parking with traffic flow (Civil), load managers (Electrical), and EV route planning apps (IT)."
  },
  {
    code: "PS-25",
    title: "Disaster Management & Rapid Response Systems",
    category: ["IoT", "App Developement", "Web Developement"],
    by: "AU Placement Cell",
    description: "Natural disasters cause heavy delays in response and rescue.",
    solution: "Build drones for supply delivery (Mech), smart flood mapping (Civil), early warning sensor systems (Electrical), and crisis apps with live SOS maps (IT)."
  },
  {
    code: "PS-26",
    title: "Gamified Learning & Skill Building (EduTech 2025)",
    category: ["App Development", "Web Developement", "Game Development"],
    by: "AU Placement Cell",
    description: "Students struggle to stay engaged in learning.",
    solution: "Create adaptive, gamified learning platforms that make studying interactive and fun."
  },
  {
    code: "PS-27",
    title: "Interactive Application for Drug Mechanisms",
    category: ["App Development", "Web Development"],
    by: "Department Of Computer engineering",
    description: "Design and develop an interactive application that visually demonstrates the mechanisms of pharmaceutical drug actions through engaging and educational animations. The app should help medical students, healthcare professionals, and patients intuitively understand how drugs interact with the body.",
    solution: "An interactive educational tool with animations that improves learning, enhances patient education, boosts engagement in pharmacology, and has potential for adoption by educational institutions and commercialization."
  },
  {
    code: "PS-28",
    title: "Virtual Museum of Pharmaceutics",
    category: ["App Development", "Web Development"],
    by: "Department Of Computer engineering",
    description: "Develop an interactive and immersive virtual museum that showcases the evolution of pharmaceutical dosage forms – from traditional tablets and syrups to advanced drug delivery systems like nanoparticles and transdermal patches.",
    solution: "A functional virtual museum prototype that educates users about dosage form evolution, enhances awareness, and provides a memorable digital learning experience."
  },
  {
    code: "PS-29",
    title: "Digital Guidelines for Chemical Safety",
    category: ["App Development", "Web Development"],
    by: "Department Of Computer engineering",
    description: "Design and build a digital module (web or mobile) for safe handling of chemicals in laboratories. The solution should include visual aids, interactive elements, and easy-to-understand instructions for students at multiple education levels.",
    solution: "A user-friendly digital module improving awareness of lab safety protocols, reducing chemical-related accidents, and serving as a scalable educational resource."
  },
  {
    code: "PS-30",
    title: "Herb-Drug & Herb-Food Interaction Navigator",
    category: ["App Development", "Web Development"],
    by: "Department Of Computer engineering",
    description: "Develop a user-friendly application that helps people safely navigate herb-drug and herb-food interactions. The app should include a searchable database, personalized alerts, and educational content, with optional EHR integration for real-time interaction checks.",
    solution: "An app with a reliable interaction database, personalized guidance, and potential healthcare integration – promoting safer use of herbal supplements and medicines."
  },
  {
    code: "PS-31",
    title: "Online Dead Stock Register",
    category: ["App Development", "Web Development"],
    by: "Department Of Computer engineering",
    description: "Replace handwritten dead stock registers with a secure online system that automatically populates records upon bill upload. The platform should provide real-time access to inventory data for multiple authorized users.",
    solution: "A web app that reduces manual errors, improves efficiency, enhances data security, and enables faster, more accurate reporting for inventory management."
  },
  {
    code: "PS-32",
    title: "Virtual Laboratory Chemical Usage Register",
    category: ["App Development", "Web Development"],
    by: "Department Of Computer engineering",
    description: "Design and develop a web/mobile app for managing, tracking, and reporting chemical inventories in laboratories. The system should automate record-keeping, improve compliance, and offer real-time access.",
    solution: "Enhanced accuracy in inventory management, improved safety, real-time reporting, better compliance, and a scalable solution adaptable to institutions."
  },
  {
    code: "PS-33",
    title: "Automated Timetable Generator",
    category: ["App Development", "Web Development"],
    by: "Department Of Computer engineering",
    description: "Develop an intelligent timetable generation system (Excel/DB/Web-based) that accounts for faculty availability, course requirements, room allocations, and workload distribution, while minimizing scheduling conflicts.",
    solution: "A system that automates timetable creation, reduces errors, optimizes faculty utilization, adapts to last-minute changes, and improves the student experience."
  },
  {
    code: "PS-34",
    title: "Medicinal Plant Identification & Description",
    category: ["App Development", "Web Development"],
    by: "Department Of Computer engineering",
    description: "Create a mobile/web application that identifies medicinal plants based on morphological features (leaf, flower, root, etc.) and provides detailed descriptions including therapeutic uses, chemical constituents, and ethnobotanical significance.",
    solution: "A reliable plant identification tool that supports healthcare, pharmaceutical research, cultural preservation, and global health initiatives."
  },
  {
    code: "PS-35",
    title: "Student Innovation",
    category: ["Student Innovation"],
    by: "ADSC",
    description: "This is an open challenge track where students can define their own problem statement and propose innovative solutions. Focus areas can include identity, self-awareness, community building, or completely new ideas.",
    solution: "Out-of-the-box projects that empower students to innovate freely, creating tools for personal or organizational identity, mental health, self-expression, or any impactful domain."
  },
  {
    code: "PS-36",
    title: "Automated Cell Life Viability Analysis",
    category: ["AI"],
    by: "Department Of Microbiology",
    description: "Manual cell viability analysis using trypan blue dye is time-consuming, error-prone, and requires significant human expertise. There is a need for an automated system that can accurately analyze cell viability from microscope images.",
    solution: "Develop an AI-powered tool (preferably using image processing and deep learning) that can analyze images of cells treated with trypan blue, differentiate live vs. dead cells, and provide statistical viability results in real-time."
  },
  {
    code: "PS-37",
    title: "Predictive Modeling of Organism Behavior in Different Media",
    category: ["AI"],
    by: "Department Of Microbiology",
    description: "Organisms behave differently when exposed to varied nutrient media, but predicting their response requires extensive experimentation. A data-driven model can help in reducing laboratory trials and predicting probable outcomes.",
    solution: "Build a machine learning model that can take organism-specific datasets (growth patterns, morphology, metabolic data, etc.) and predict their behavior or probability of survival across different media conditions."
  },
  {
    code: "PS-38",
    title: "Smart Plant Growth and Health Analysis",
    category: ["AI", "Web Development", "App Development"],
    by: "Department Of Microbiology",
    description: "Plant growth assessment (germination day, pigmentation, leaf area measurement) is still largely manual, making it difficult to scale research and crop monitoring.",
    solution: "Create an AI/ML solution or mobile app that can analyze plant images to automatically detect germination stage, measure leaf area, and assess pigmentation levels for plant health monitoring."
  },
  {
    code: "PS-39",
    title: "Smart To-Do & Study Planner",
    category: ["Web Development", "App Developement"],
    by: "ADSC",
    description: "First-year students face difficulties in managing study schedules, assignments, and personal tasks effectively, often leading to stress and missed deadlines.",
    solution: "Develop a web/app-based personal planner where students can add tasks, categorize them (study, personal, assignments), and set reminders. Bonus: Visualize tasks in a calendar view and allow simple drag-and-drop rescheduling."
  },
  {
    code: "PS-40",
    title: "Lost & Found Hub for Campus",
    category: ["Web Development", "App Developement"],
    by: "ADSC",
    description: "Students frequently misplace items such as ID cards, books, or accessories on campus, but there is no centralized way to report or find them.",
    solution: "Create a simple mobile/web app where students can post lost or found items with descriptions/photos. Other students can search and contact the finder/owner. Bonus: Add filters (by category, date, location) for easier searching."
  },
  {
    code: 'PS-41',
    title: "Smart Document Merger – A Tool for Seamless Document Consolidation",
    category: ["Web Development", "App Development"],
    by: "ADSC",
    solution: "A web or desktop application that allows users to upload multiple documents (Word, PDF, etc.) and automatically merges them into a single, well-formatted document. The tool should ensure consistent formatting, margins, fonts, and design across the merged document. Bonus features could include drag-and-drop reordering of documents, preview before merging, and options to select specific sections/pages to include.",
    description: "In academic, publishing, and professional settings, multiple documents such as chapters of a book, research papers, or departmental reports are often created separately. Merging these documents into a single, well-formatted file is a time-consuming and error-prone process. Inconsistent designs, margins, fonts, and layouts lead to an unprofessional final output and require significant manual editing.To address this challenge, a Smart Document Merger tool is proposed. This tool will automatically combine multiple documents into one unified document while ensuring consistent formatting, margins, fonts, and design standards across the entire file. By eliminating the need for manual adjustments, the solution will save time, reduce human error, and provide a professional, ready-to-publish document with minimal effort.",
  }
];

export const categories = [
  "All Categories", "AI", "Web Development", "App Development", "Cloud Computing", "Cybersecurity", "Mobile Development", "IoT", "Blockchain", "Game Development", "AR / VR", "App Developement", "Web Developement", "EV", "Student Innovation"
];
