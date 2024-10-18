// components/Navigation.tsx
import Link from 'next/link';

const Navigation = () => {
    return (
        <nav>
            <ul>
            <li>
                    <Link href="/">Home</Link> 
                </li>
                <li>
                    <Link href="/notes">Notes</Link>
                </li>
                <li>
                    <Link href="/users">Users</Link>
                </li>
                <li>
                    <Link href="/feeds">Feeds</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
