const csvFilePath = './students.csv';
const X = 1;
const Y = 20;

function addMarkToCsv() {
  const fs = require('fs');
  const csvFileContent = fs.readFileSync(csvFilePath, 'utf-8');
  const lines = csvFileContent.split('\n');

  let sumOfMarks = 0;
  let students = lines.map((line, index) => {
    if (index === 0) {
      return line; 
    }

    const [studentId, lastName, firstName, mark, comment] = line.split(';');

    if (mark === '') {
      const randomMark = Math.floor(Math.random() * (Y - X + 1)) + X;
      sumOfMarks += randomMark;
      return `${studentId};${lastName};${firstName};${randomMark};${comment}`;
    }

    sumOfMarks += parseInt(mark);
    return line;
  });

  const averageMark = sumOfMarks / (students.length - 1); 
  const averageMarkLine = `;;;;${averageMark.toFixed(2)};`;

  students.push(averageMarkLine);

  const updatedCsvContent = students.join('\n');
  fs.writeFileSync(csvFilePath, updatedCsvContent, 'utf-8');

  console.log(updatedCsvContent);
}

module.exports = addMarkToCsv;