import React, { useState } from 'react';

const PaperFormWithStepper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const steps = 7; // Total number of steps
    const [data, setData] = useState({
        type: '',
        classification: [],
        language_option: '',
        comments: '',
        title: '',
        abstract: '',
        keywords: '',
        funding: '',
        conflictsOfInterest: '',
        ethicalStatement: '',
        consentToPolicies: false,
        editableFile: null,
        pdfFile: null,
        imageFile: null,
    });

    const [classifications, setClassifications] = useState([]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Combine classifications array into a single string
        const formData = new FormData();
        formData.append('type', data.type);
        formData.append('classification', classifications.join(', '));
        formData.append('language_option', data.language_option);
        formData.append('comments', data.comments);
        formData.append('title', data.title);
        formData.append('abstract', data.abstract);
        formData.append('keywords', data.keywords);
        formData.append('funding', data.funding);
        formData.append('conflictsOfInterest', data.conflictsOfInterest);
        formData.append('ethicalStatement', data.ethicalStatement);
        formData.append('consentToPolicies', data.consentToPolicies);
        formData.append('editableFile', data.editableFile);
        formData.append('pdfFile', data.pdfFile);
        formData.append('imageFile', data.imageFile);

        // Post data to API
        fetch('/api/papers', {
            method: 'POST',
            body: formData,
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const handleClassificationChange = (e) => {
        if (e.target.checked) {
            setClassifications([...classifications, e.target.value]);
        } else {
            setClassifications(classifications.filter(c => c !== e.target.value));
        }
    };

    const handleNext = () => {
        if (activeStep < steps - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const handlePrev = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Submit New Manuscript</h3>
            <p className="mb-2">Ready to share your research? Submit a new manuscript here and start the journey towards publication.</p>

            {/* Stepper */}
            <ol className="flex flex-wrap items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base overflow-x-auto">
                {Array.from({ length: steps }, (_, index) => (
                    <li key={index} className={`relative flex items-center ${activeStep >= index ? 'text-blue-600 dark:text-blue-500' : ''} mx-2 my-2 xl:mx-4`}>
                        {index < steps - 1 && (
                            <span className="absolute top-1/2 left-full w-[calc(100%-1rem)] border-b border-gray-200 dark:border-gray-700 transform -translate-y-1/2"></span>
                        )}
                        <span className="flex items-center">
                            <span className={`flex items-center justify-center w-6 h-6 border ${activeStep >= index ? 'border-blue-600 dark:border-blue-500' : 'border-gray-600 dark:border-gray-500'} rounded-full shrink-0 mr-2 ml-2`}>
                                {index + 1}
                            </span>
                        </span>
                    </li>
                ))}
            </ol>

            {/* Form */}
            <form onSubmit={handleFormSubmit}>
                {/* Step 1: Select Article Type */}
                {activeStep === 0 && (
                    <div className="mt-4 mb-5">
                        <label htmlFor="type">Select Article Type</label>
                        <select
                            id="type"
                            name="type"
                            value={data.type}
                            onChange={(e) => setData({ ...data, type: e.target.value })}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Journal">Journal</option>
                            <option value="Conference">Conference</option>
                            {/* Add other types */}
                        </select>
                        <div className="mt-5">
                            <button type="button" onClick={handleNext}>Next</button>
                        </div>
                    </div>
                )}

                {/* Step 2: Classifications */}
                {activeStep === 1 && (
                    <div className='mt-4 mb-5'>
                        <label>Classification</label>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Lecture"
                                    onChange={handleClassificationChange}
                                />
                                Lecture
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Workshop"
                                    onChange={handleClassificationChange}
                                />
                                Workshop
                            </label>
                            {/* Add more classifications */}
                        </div>
                        <div className="mt-5">
                            <button type="button" onClick={handlePrev}>Previous</button>
                            <button type="button" onClick={handleNext}>Next</button>
                        </div>
                    </div>
                )}

                {/* Step 3: Title */}
                {activeStep === 2 && (
                    <div className="mt-4 mb-5">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            required
                        />
                        <div className="mt-5">
                            <button type="button" onClick={handlePrev}>Previous</button>
                            <button type="button" onClick={handleNext}>Next</button>
                        </div>
                    </div>
                )}

                {/* Step 4: File Upload */}
                {activeStep === 3 && (
                    <div className="mt-4 mb-5">
                        <label htmlFor="editableFile">Editable File</label>
                        <input
                            type="file"
                            id="editableFile"
                            onChange={(e) => setData({ ...data, editableFile: e.target.files[0] })}
                            required
                        />
                        <div className="mt-5">
                            <button type="button" onClick={handlePrev}>Previous</button>
                            <button type="button" onClick={handleNext}>Next</button>
                        </div>
                    </div>
                )}

                {/* Additional steps as needed */}

                {/* Final Step: Submit */}
                {activeStep === steps - 1 && (
                    <div className="mt-5">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={handlePrev}>Previous</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default PaperFormWithStepper;
