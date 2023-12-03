import { useState } from "react"
import { Chart as ChartJS, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(...registerables)


export const InstructorCourseChart = ({ instructorDetails }) => {

    const [status, setStatus] = useState("Students")

    const generateRandomColors = (numColors) => {
        const colors = []
        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)})`
            colors.push(color)
        }
        return colors
    }

    const chartDataStudents = {
        labels: instructorDetails.map((course) => course.courseName),
        datasets: [
            {
                data: instructorDetails.map((course) => course.totalEnrolledStudent),
                backgroundColor: generateRandomColors(instructorDetails.length),
            },
        ],
    }

    const chartIncomeData = {
        labels: instructorDetails.map((course) => course.courseName),
        datasets: [
            {
                data: instructorDetails.map((course) => course.totalIncome),
                backgroundColor: generateRandomColors(instructorDetails.length),
            },
        ],
    }

    const options = {
        maintainAspectRatio: false,
    }

    return (
        <div>

            <div className='flex gap-2 text-yellow-50 font-semibold text-sm'>

                <button
                    onClick={() => setStatus('Students')}
                    className={`py-1 px-3 transition-all duration-200 
                    ${status === 'Students' ? 'bg-richblack-700 rounded-md' : 'opacity-50'}`}
                >
                    Students
                </button>

                <button
                    onClick={() => setStatus('Income')}
                    className={`py-1 px-3 transition-all duration-200 
                    ${status === 'Income' ? 'bg-richblack-700 rounded-md' : 'opacity-50'}`}
                >
                    Income
                </button>
            </div>

            <div className="relative mx-auto aspect-square max-h-[400px]">

                <Pie
                    data={status === "Students" ? chartDataStudents : chartIncomeData}
                    options={options}
                />

            </div>

        </div>
    )
}
