import StudioPage from './StudioPage';

// Required for static export - pre-generate the base /admin route
export function generateStaticParams() {
    return [{ tool: [] }];
}

export default function AdminStudioPage() {
    return <StudioPage />;
}
