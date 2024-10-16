// pages/index.tsx
import Link from 'next/link';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Breastfeeding App</h1>
            <p>Your resource for breastfeeding information!</p>
            <Link href="/feeds">Go to Feeds</Link><br />
            <Link href="/users">Go to Users</Link><br />
            <Link href="/notes">Go to Notes</Link>
        </div>
    );
};

export default Home;
