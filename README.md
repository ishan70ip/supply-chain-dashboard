# **Supply Chain Optimization Dashboard**

In the digital age, where supply chains are the backbone of global commerce, the ability to **predict, optimize, and react** in real time has become a competitive superpower. This project is a modern, AI-powered command center designed to tackle the complex challenges of supply chain management with intelligence and style.

With an interactive interface built using **React, TypeScript, and Tailwind CSS**, and multiple machine learning models serving as the brains behind the operation, this project bridges the gap between **human decision-making and AI-driven insights**. 

---

<!-- Hero Image -->
<p align="center">
  <img src="assets/dashboard.png" alt="Dashboard"  width="100%" />
</p>

## **🎯 Motivation**

Picture yourself in charge of a supply chain that stretches across the globe, dealing with suppliers, keeping track of inventory, and making sure shipments arrive on time. Just when you think you've got everything sorted, a supplier lets you down, you run out of stock where you need it most, and a shipment to Europe gets held up in customs. Suddenly, it's mayhem.

That is where this tool comes in, it helps you:
- Enhance supplier reliability.
- Forecast inventory needs.
- Predict and mitigate shipment delays.
- Provide a visual, user-friendly interface to tie it all together.

---

## **🚀 Key Features**

1. **AI-Driven Predictive Insights**  
   - **Supplier Reliability Prediction**: Identify which suppliers are likely to meet expectations and which might falter.  
   - **Inventory Demand Forecasting**: Stay ahead of demand fluctuations with accurate predictions.  
   - **Shipment Delay Prediction**: Spot potential delays before they disrupt the supply chain.

2. **Real-Time Monitoring**  
   - Keep tabs on order fulfillment rates, inventory turnover, supplier performance, and shipment statuses—all updated dynamically.

3. **Interactive and Intuitive Design**  
   - A sleek, modern dashboard built with **React** and styled with **Tailwind CSS**.  
   - Optimized for **mobile and desktop**, with a focus on usability and responsiveness.

4. **Report Generation**  
   - Generate detailed PDF reports summarizing key metrics and predictions with a single click.

---

## **🛠️ Tech Stack**

### **1. Machine Learning Backend**
At the core of the dashboard are three machine learning models, each tailored to solve a critical supply chain challenge:

#### **Supplier Reliability Prediction**
- **Problem**: How do you know if a supplier is dependable?  
- **Solution**: A **Random Forest Classifier** analyzes supplier data (lead time, costs, past performance etc.) to predict reliability (0 = unreliable, 1 = reliable).  
- **Impact**: Proactively identify unreliable suppliers and mitigate risks.

#### **Inventory Demand Forecasting**
- **Problem**: How can you prevent overstocking or stockouts?  
- **Solution**: An **ARIMA (AutoRegressive Integrated Moving Average)** model forecasts inventory levels based on historical stock data.  
- **Impact**: Make data-driven decisions to optimize inventory turnover.

#### **Shipment Delay Prediction**
- **Problem**: Will your shipment arrive on time?  
- **Solution**: A **Logistic Regression** model predicts delays based on historical data like delay times and shipment routes.  
- **Impact**: Take corrective action before delays disrupt operations.

All models are trained using publicly avaible datasets on Kaggle. The backend is implemented in Python and served via **FastAPI**, enabling seamless communication with the frontend.

---

### **2. Frontend Framework**
The frontend leverages:
- **Component-based design** for modularity and reusability.
- **Tailwind CSS** for rapid styling and consistent, responsive design.
- **Lucide Icons** for intuitive, visually appealing indicators.

Key components include:
- **Metric Cards**: Display KPIs like order fulfillment rate, inventory turnover, and cost efficiency.
- **Supplier Table**: Highlight supplier performance metrics like reliability, lead time, and cost per unit.
- **Shipment Tracker**: Provide real-time updates on active shipments, including ETA adjustments and delay warnings.

---

### **3. Real-Time Data Flow**
1. **Backend API**: The FastAPI backend provides endpoints for predictions and report generation.
2. **Frontend API Integration**: React fetches predictions and updates components dynamically.
3. **State Management**: Local state is managed using React hooks to ensure smooth, responsive updates.

---

## **📂 Workflow: From Data to Dashboard**

Here’s how the project comes together step by step:

### **1. Data Preparation**
- Gather historical data on suppliers, inventory, and shipments from Kaggle or any other available dataset.
- Preprocess the data using fills for missing data, dropping outliers and ensuring consistency between categorical and numerical values.

### **2. Model Training**
- Train machine learning models using **Scikit-learn** and **Statsmodels**.
- Save models as `.pkl` files for deployment.

### **3. Backend Development**
- Set up a **FastAPI** server to expose prediction endpoints.
- Add a PDF report generation feature using the **FPDF** library.

### **4. Frontend Development**
- Build React components for each section of the dashboard.
- Style the dashboard using **Tailwind CSS** for a modern, professional look.
- Connect the frontend to the backend via REST API calls.

### **5. Deployment**
- Use **Vite** for efficient frontend bundling and hot module replacement.
---
## **📜 License**
This project is licensed under the Apache License.
