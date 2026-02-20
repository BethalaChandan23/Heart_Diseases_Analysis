// Generate realistic heart disease dataset with 500+ patient records

const generateHeartDiseaseData = () => {
  const data = [];
  const regions = ['Rural', 'Urban'];
  const genders = ['Male', 'Female'];
  const smokingStatuses = ['Never', 'Former', 'Current'];
  const activityLevels = ['Sedentary', 'Light', 'Moderate', 'Active'];
  
  // Helper function to generate random number in range
  const randomInRange = (min, max) => Math.random() * (max - min) + min;
  
  // Helper function to calculate disease probability based on risk factors
  const calculateDiseaseProbability = (age, cholesterol, bmi, smoking, activity) => {
    let probability = 0.1; // Base 10% probability
    
    // Age factor
    if (age > 65) probability += 0.35;
    else if (age > 55) probability += 0.25;
    else if (age > 45) probability += 0.15;
    else if (age > 35) probability += 0.05;
    
    // Cholesterol factor
    if (cholesterol > 280) probability += 0.25;
    else if (cholesterol > 240) probability += 0.15;
    else if (cholesterol > 200) probability += 0.08;
    
    // BMI factor
    if (bmi > 35) probability += 0.20;
    else if (bmi > 30) probability += 0.12;
    else if (bmi > 25) probability += 0.05;
    
    // Smoking factor
    if (smoking === 'Current') probability += 0.30;
    else if (smoking === 'Former') probability += 0.10;
    
    // Activity factor
    if (activity === 'Sedentary') probability += 0.15;
    else if (activity === 'Light') probability += 0.08;
    else if (activity === 'Moderate') probability -= 0.05;
    else if (activity === 'Active') probability -= 0.10;
    
    return Math.min(probability, 0.95); // Cap at 95%
  };
  
  for (let i = 0; i < 550; i++) {
    // Generate age with normal distribution centered around 50-55
    const ageBase = 50 + (Math.random() - 0.5) * 40;
    const age = Math.max(20, Math.min(90, Math.round(ageBase)));
    
    const gender = genders[Math.floor(Math.random() * genders.length)];
    
    // BMI with slight normal distribution
    const bmiBase = 26 + (Math.random() - 0.5) * 14;
    const bmi = Math.max(16, Math.min(45, parseFloat(bmiBase.toFixed(1))));
    
    // Cholesterol levels
    const cholesterolBase = 200 + (Math.random() - 0.3) * 120;
    const cholesterol = Math.max(150, Math.min(350, Math.round(cholesterolBase)));
    
    // Blood pressure (systolic/diastolic)
    const systolicBase = 120 + (age - 40) * 0.5 + (Math.random() - 0.5) * 40;
    const systolic = Math.max(90, Math.min(200, Math.round(systolicBase)));
    const diastolic = Math.round(systolic * 0.65);
    
    const smokingStatus = smokingStatuses[Math.floor(Math.random() * smokingStatuses.length)];
    const physicalActivity = activityLevels[Math.floor(Math.random() * activityLevels.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    
    // Calculate disease status based on risk factors
    const diseaseProbability = calculateDiseaseProbability(age, cholesterol, bmi, smokingStatus, physicalActivity);
    const hasDisease = Math.random() < diseaseProbability;
    
    data.push({
      id: i + 1,
      age,
      gender,
      bmi,
      cholesterol,
      bloodPressure: `${systolic}/${diastolic}`,
      systolic,
      diastolic,
      smokingStatus,
      physicalActivity,
      region,
      diseaseStatus: hasDisease ? 'Yes' : 'No',
      // Additional calculated fields for analysis
      ageGroup: age < 30 ? '20-30' : age < 40 ? '31-40' : age < 50 ? '41-50' : age < 60 ? '51-60' : age < 70 ? '61-70' : '71+',
      bmiCategory: bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese',
      cholesterolLevel: cholesterol < 200 ? 'Normal' : cholesterol < 240 ? 'Borderline High' : 'High',
      bpCategory: systolic < 120 ? 'Normal' : systolic < 130 ? 'Elevated' : systolic < 140 ? 'Stage 1' : 'Stage 2'
    });
  }
  
  return data;
};

export const heartDiseaseData = generateHeartDiseaseData();

// Export helper functions for filtering and analysis
export const filterData = (data, filters) => {
  return data.filter(patient => {
    if (filters.ageRange && (patient.age < filters.ageRange[0] || patient.age > filters.ageRange[1])) {
      return false;
    }
    if (filters.gender && filters.gender !== 'All' && patient.gender !== filters.gender) {
      return false;
    }
    if (filters.bmiCategory && filters.bmiCategory !== 'All' && patient.bmiCategory !== filters.bmiCategory) {
      return false;
    }
    if (filters.cholesterolLevel && filters.cholesterolLevel !== 'All' && patient.cholesterolLevel !== filters.cholesterolLevel) {
      return false;
    }
    if (filters.smokingStatus && filters.smokingStatus !== 'All' && patient.smokingStatus !== filters.smokingStatus) {
      return false;
    }
    if (filters.region && filters.region !== 'All' && patient.region !== filters.region) {
      return false;
    }
    return true;
  });
};

export const calculateStatistics = (data) => {
  const total = data.length;
  const diseased = data.filter(p => p.diseaseStatus === 'Yes').length;
  const prevalence = ((diseased / total) * 100).toFixed(1);
  
  return {
    total,
    diseased,
    healthy: total - diseased,
    prevalence: parseFloat(prevalence)
  };
};