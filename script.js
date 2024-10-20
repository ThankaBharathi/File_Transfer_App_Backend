const connectDB = require('./config/db');
const File = require('./models/file');
const fs = require('fs');
const path = require('path');

connectDB();

// Get all records older than 24 hours 
async function fetchData() {
    try {
        const files = await File.find({ createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } });

        if (files.length) {
            for (const file of files) {
                try {
                    // Construct full file path
                    const filePath = path.join(__dirname, file.path);
                    
                    // Delete the file from the filesystem
                    fs.unlinkSync(filePath);
                    
                    // Remove the record from the database
                    await file.remove();
                    console.log(`Successfully deleted ${file.filename}`);
                } catch (err) {
                    console.error(`Error while deleting file ${file.filename}: ${err}`);
                }
            }
        } else {
            console.log('No files older than 24 hours found.');
        }
    } catch (err) {
        console.error(`Error fetching files: ${err}`);
    } finally {
        console.log('Job done!');
        process.exit();
    }
}

// Execute the function
fetchData();
