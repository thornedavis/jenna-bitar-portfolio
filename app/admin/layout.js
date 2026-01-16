export const metadata = {
    title: 'Jenna Bitar - Content Manager',
};

export default function AdminLayout({ children }) {
    // Navigation and Footer are already hidden on /admin routes
    // Just pass through children for full Sanity Studio experience
    return children;
}
