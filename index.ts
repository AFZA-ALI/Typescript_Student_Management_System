#! /usr/bin/env node

import inquirer from "inquirer";

class Student{
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number

    constructor(name: string){
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; //initialize an empty array for courses
        this.balance = 100;
    }

    //Method to enroll a student in a course
    enroll_course(course: string){
        this.courses.push(course);
    }

    //Method to view a student balance
    view_balance(){
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }

    //Method to pay a student fees
    pay_fees(amount: number){
        this.balance -= amount;
        console.log(`$${amount} Fees paid Successfully for ${this.name}`);
        console.log(`Remaining Balance : $${this.balance}`);
        
    }

    //Method to display a student status
    show_status(){
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}

//Defining a student_manager class to manage students
class student_manager {
    students: Student[]

    constructor(){
        this.students = [];
    }
    //Method to add a new student
    Add_student(name: string){
        let student = new Student(name);
        this.students.push(student)
        console.log(`Student: ${name} added Successfully. Student ID ${student.id}`)
    }

    //Method to enroll a student in a course
    Enroll_student(student_id: number, course: string){
     let student =this.find_student(student_id)
     if(student){
        student.enroll_course(course);
        console.log(`${student.name} enrolled in ${course} Successfully`);
     }
    }

    //Method to view a student balance
    View_student_balance(student_id: number){
        let student =this.find_student(student_id)
        if (student){
            student.view_balance();
        }
        else{
            console.log("Student not found. Please enter a correct student ID")
        }
        
    }

    //Method to pay student fees
    pay_student_fees(student_id: number, amount: number){
        let student =this.find_student(student_id)
        if (student){
            student.pay_fees(amount);
        }
        else{
            console.log("Student not found. Please enter a correct student ID")
        }
    }

    //Method to display a student status
    show_student_status(student_id: number){
        let student =this.find_student(student_id)
        if (student){
            student.show_status();
        }
    }
    
    //method to find a student by student_id
    find_student(student_id: number){
        return this.students.find(std => std.id === student_id);
    }
}

//Main function to run the program
async function main(){
    console.log("Welcome to 'Afza Ali' - Student Management System");
    console.log("-".repeat(50));

    let Student_manager = new student_manager();


    //while loop to keep program running
    while (true){
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add student",
                    "Enroll student",
                    "View student balance",
                    "Pay Fees",
                    "Show status",
                    "Exit"
                ]
            }
        ]);
        
        //Using switch case to handle user choice

        switch(choice.choice){
            case "Add student":
            let name_input = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Enter a Student Name"
            }
            ]);
            Student_manager.Add_student(name_input.name);
            break;

            case "Enroll student":
            let course_input = await inquirer.prompt([
                {
                    name: "student_id",
                    type: "number",
                    message: "Enter a Student ID",
                },
                {
                    name: "course",
                    type: "input",
                    message: "Enter a Course Name",
                }
            ]);
            Student_manager.Enroll_student(course_input.student_id, course_input.course);
            break;

            case "View student balance":
            let balance_input = await inquirer.prompt([
                {
                    name: "student_id",
                    type: "number",
                    message: "Enter a Student ID",
                }
            ]);
            Student_manager.View_student_balance(balance_input.student_id);
            break;

            case "Pay Fees":
            let fees_input = await inquirer.prompt([
                {
                    name: "student_id",
                    type: "number",
                    message: "Enter a Student ID",
                },
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to pay"
                }
            ]);
            Student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
            break;

            case "Show status":
            let status_input = await inquirer.prompt([
                {
                    name: "student_id",
                    type: "number",
                    message: "Enter a Student ID",
                }
            ]);
            Student_manager.show_student_status(status_input.student_id);
            break;

            case "Exit":
              console.log("Exiting...");
              process.exit();
        }
    }
}

//Calling a main function
main();