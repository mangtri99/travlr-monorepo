import productSeeder from './product';

const runSeeder = async () => {
  try {
    const count = parseInt(process.argv[2], 10) || 10; // Argument for count
    const isReset = process.argv[3] === 'true'; // Argument for isReset

    console.log(`Seeding products with count = ${count}, isReset = ${isReset}`);
    const result = await productSeeder(count, isReset);
    console.log(`Seeder completed: ${result}`);
  } catch (error) {
    console.error('Error running seeder:', error);
  }
};

runSeeder();
