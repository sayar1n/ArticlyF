import AuthCheck from '@/app/utils/AuthCheck';

export default function DashboardPage() {
    return (
        <AuthCheck>
            <div>
                Ура ура ура, я студент МИРЭА
            </div>
        </AuthCheck>
    )
}