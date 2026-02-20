import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const FilterPanel = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Age Range Slider */}
        {filters.ageRange !== undefined && (
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}
            </Label>
            <Slider
              min={20}
              max={90}
              step={1}
              value={filters.ageRange}
              onValueChange={(value) => onFilterChange('ageRange', value)}
              className="mt-2"
            />
          </div>
        )}

        {/* Gender Filter */}
        {filters.gender !== undefined && (
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Gender</Label>
            <select
              value={filters.gender}
              onChange={(e) => onFilterChange('gender', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        )}

        {/* BMI Category Filter */}
        {filters.bmiCategory !== undefined && (
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">BMI Category</Label>
            <select
              value={filters.bmiCategory}
              onChange={(e) => onFilterChange('bmiCategory', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            >
              <option value="All">All</option>
              <option value="Underweight">Underweight</option>
              <option value="Normal">Normal</option>
              <option value="Overweight">Overweight</option>
              <option value="Obese">Obese</option>
            </select>
          </div>
        )}

        {/* Cholesterol Level Filter */}
        {filters.cholesterolLevel !== undefined && (
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Cholesterol Level</Label>
            <select
              value={filters.cholesterolLevel}
              onChange={(e) => onFilterChange('cholesterolLevel', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            >
              <option value="All">All</option>
              <option value="Normal">Normal (&lt;200)</option>
              <option value="Borderline High">Borderline High (200-239)</option>
              <option value="High">High (≥240)</option>
            </select>
          </div>
        )}

        {/* Smoking Status Filter */}
        {filters.smokingStatus !== undefined && (
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Smoking Status</Label>
            <select
              value={filters.smokingStatus}
              onChange={(e) => onFilterChange('smokingStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            >
              <option value="All">All</option>
              <option value="Never">Never</option>
              <option value="Former">Former</option>
              <option value="Current">Current</option>
            </select>
          </div>
        )}

        {/* Region Filter */}
        {filters.region !== undefined && (
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Region</Label>
            <select
              value={filters.region}
              onChange={(e) => onFilterChange('region', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            >
              <option value="All">All</option>
              <option value="Rural">Rural</option>
              <option value="Urban">Urban</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;