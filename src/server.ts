import app from './app';
import connectDB from './config/db'; // Adjust the path according to your project structure

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(); // Wait for the database connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
