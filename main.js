import readlinesync from 'readline-sync'
import fs from 'fs'
const path_file = 'data.csv'
let select = true;3
while (select) {
    console.log('----------------Menu----------------');
    console.log('1.Login');
    console.log('2.Create Account');
    console.log('3.Exit');
    const choice = readlinesync.question('select option:');
    switch (choice) {
        case '2':
            const userName = readlinesync.question('Enter Your Name: ');
            const email = readlinesync.question('Enter your Email: ');
            const password = readlinesync.question('Enter your password: ',);
            const confirmPassword = readlinesync.question('Confirm Password: ');

            if (password !== confirmPassword) {
                console.log('Passwords do not match!');
            } else {
                let id = 1;

                if (fs.existsSync(path_file)) {
                    const data = fs.readFileSync(path_file, 'utf-8');
                    const lines = data.split('\n');
                    const validLines = lines.filter(line => line.trim() !== '');
                    id = validLines.length;
                } else {
                    fs.writeFileSync(path_file, 'ID,UserName,Email,Password\n');
                }

                const row = `${id},${userName},${email},${password}\n`;

                fs.appendFileSync(path_file, row);
                console.log(' Account created successfully!');
            }
            break;
        case '1':
            const loginEmail = readlinesync.question('Enter your Email: ');
            const loginPassword = readlinesync.question('Enter your Password: ', { hideEchoBack: true });

            if (!fs.existsSync(path_file)) {
                console.log(' No users found. Please register first.');
                break;
            }
            const data = fs.readFileSync(path_file, 'utf-8');
            const line = data.split('\n');
            let isLogin = false;
            for (let i = 0; i < line.length; i++) {
                if (!line[i].trim()) continue;

                const [id, userName, email, password] = line[i].split(',');
                if (email.trim() === loginEmail.trim() && password === loginPassword) {
                    console.log(` Login successful! Welcome ${userName}`);
                    isLogin = true;
                    select = false;
                    break;
                }
            }
            if (!isLogin) {
                console.log(' Invalid email or password!');
            }
            break;
        case '3':
            console.log('Exit program...');
            select = false;
            break;

        default:
            console.log('Invalid option!');
    }
}
