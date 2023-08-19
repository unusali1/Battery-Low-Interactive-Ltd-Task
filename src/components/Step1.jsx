import React, { useState } from "react";

const Step1 = ({ onNext }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    client: "",
    contractor: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = (event) => {
    if (formData.projectName && formData.projectDescription && formData.client && formData.contractor) {
      onNext(formData);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="form-title">Step1 : Fill Up The Form</h1>
        <form>
          <div className="main-project-info">
            <div className="input-box">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                name="projectName"
                placeholder="Project Name"
                value={formData.projectName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="project-description">Project Description</label>
              <input
                type="text"
                name="projectDescription"
                placeholder="Project Description"
                value={formData.projectDescription}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="client">Client</label>
              <input
                type="text"
                name="client"
                placeholder="Client"
                value={formData.client}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="contractor">Contractor</label>
              <input
                type="text"
                name="contractor"
                placeholder="Contractor"
                value={formData.contractor}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-submit-btn">
              <button type="submit" onClick={handleNext}>Next</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Step1;