import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, MapPin, User, ArrowRight, Activity, Heart, TrendingUp } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const HomePage = () => {
  const scenarios = [
    {
      icon: Stethoscope,
      title: 'Dr. Sharma - Clinical Dashboard',
      description: 'Comprehensive patient analytics with interactive filters, disease prevalence charts, and risk assessment tools for medical professionals.',
      path: '/dr-sharma',
      color: 'from-blue-500 to-blue-600',
      features: ['Patient Segmentation', 'Risk Analysis', 'Clinical Insights']
    },
    {
      icon: MapPin,
      title: 'Ramesh - Regional Policy Dashboard',
      description: 'Regional health trends, rural vs urban comparisons, and data-driven policy recommendations for healthcare administrators.',
      path: '/ramesh',
      color: 'from-green-500 to-green-600',
      features: ['Regional Trends', 'Policy Insights', 'Comparative Analysis']
    },
    {
      icon: User,
      title: 'Anita - Personal Health Dashboard',
      description: 'Personalized risk assessment, health recommendations, and actionable insights for individuals monitoring their heart health.',
      path: '/anita',
      color: 'from-purple-500 to-purple-600',
      features: ['Risk Calculator', 'Health Tips', 'Personalized Advice']
    }
  ];

  const stats = [
    { icon: Activity, value: '550+', label: 'Patient Records' },
    { icon: Heart, value: '3', label: 'Dashboards' },
    { icon: TrendingUp, value: '10+', label: 'Analytics' }
  ];

  return (
    <>
      <Helmet>
        <title>Heart Disease Analysis - Comprehensive Healthcare Analytics Platform</title>
        <meta name="description" content="Advanced heart disease analysis platform with clinical dashboards, regional policy insights, and personal health risk assessment tools." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1685995833594-8c35ffa8ccb0"
              alt="Medical professionals analyzing heart health data"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/85 to-teal-900/90"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center text-white"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2">
                  <span className="text-sm font-medium">Advanced Healthcare Analytics</span>
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Heart Disease Analysis Platform
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Empowering healthcare professionals, policy makers, and individuals with 
                data-driven insights for better heart health outcomes
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-4"
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-blue-200">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <a
                  href="#dashboards"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Explore Dashboards
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Dashboards Section */}
        <section id="dashboards" className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Three Perspectives, One Goal
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored dashboards designed for different stakeholders in the healthcare ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Link to={scenario.path} className="block group">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                    <div className={`bg-gradient-to-r ${scenario.color} p-6`}>
                      <scenario.icon className="w-12 h-12 text-white mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {scenario.title}
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {scenario.description}
                      </p>
                      
                      <div className="space-y-2 mb-6">
                        {scenario.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${scenario.color}`}></div>
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                        View Dashboard
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Overview */}
        <section className="bg-gradient-to-br from-blue-600 to-teal-600 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center text-white"
            >
              <h2 className="text-4xl font-bold mb-6">
                Comprehensive Analytics for Better Health Outcomes
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
                Our platform combines advanced data visualization, machine learning insights, 
                and evidence-based recommendations to support informed healthcare decisions
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <Activity className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                  <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
                  <p className="text-blue-100 text-sm">Interactive charts and filters for deep data exploration</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                  <h3 className="text-xl font-semibold mb-2">Risk Assessment</h3>
                  <p className="text-blue-100 text-sm">Evidence-based risk scoring and personalized recommendations</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                  <h3 className="text-xl font-semibold mb-2">Trend Analysis</h3>
                  <p className="text-blue-100 text-sm">Historical patterns and predictive insights for better planning</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;