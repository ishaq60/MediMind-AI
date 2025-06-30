"use client"
import React from 'react';
import SymptomChecker from '../SyndromeChecker/SymptomChecker';

const page = () => {
    return (
        <div className='container mx-auto min-h-screen'>
           <SymptomChecker></SymptomChecker>
        </div>
    );
};

export default page;