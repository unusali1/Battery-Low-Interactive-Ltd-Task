import React from "react";
import "./resultPage.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFResult from "./PDFResult";

const ResultPage = ({ formData, maxX, minX, maxY, minY, maxZ, minZ }) => {

    return (
        <div>
            <h2 className="form-title">Result</h2>
            <div className="table1">
                <table className="step1-table">
                    <tr>
                        <th>Project Name:</th>
                        <th>Project Description:</th>
                        <th>Client:</th>
                        <th>Contractor: </th>
                    </tr>
                    <tr>
                        <td>{formData.projectName}</td>
                        <td>{formData.projectDescription}</td>
                        <td>{formData.client}</td>
                        <td>{formData.contractor}</td>
                    </tr>
                </table>
            </div>
            <div className="table1">
                <table className="step2-table">
                    <tr>
                        <th>maxX</th>
                        <th>minX</th>
                        <th>maxY </th>
                        <th>minY </th>
                        <th>maxZ</th>
                        <th>minZ</th>
                    </tr>
                    <tr>
                        <td>{maxX}</td>
                        <td>{minX}</td>
                        <td>{maxY}</td>
                        <td>{minY}</td>
                        <td>{maxZ}</td>
                        <td>{minZ}</td>
                    </tr>
                </table>
            </div>
            <button className="result-btn">
                <PDFDownloadLink
                    document={
                        <PDFResult {...{ formData, maxX, minX, maxY, minY, maxZ, minZ }} />
                    }
                    fileName="result.pdf">
                    Download Result
                </PDFDownloadLink>
            </button>
        </div>
    )
}

export default ResultPage;