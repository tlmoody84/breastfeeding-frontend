// components/Navigation.tsx
import Link from 'next/link';

const Navigation = () => {
    return (
        <nav>
            <ul>
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







// // components/Navigation.tsx
// import Link from 'next/link';

// const Navigation = () => {
//     return (
//         <nav className="sidebar">
//             <ul className="navList">
//                 <li className="navItem">
//                     <Link href="/notes">Notes</Link>
//                 </li>
//                 <li className="navItem">
//                     <Link href="/users">Users</Link>
//                 </li>
//                 <li className="navItem">
//                     <Link href="/feeds">Feeds</Link>
//                 </li>
//             </ul>
//         </nav>
//     );
// };

// export default Navigation;

