
interface Permissions {
    userId: string;
    adminRole: boolean;
    firstNmae: string;
    lastName: string;
}

const adminUsers = [
    'antwisam80@gmail.com',
]


export const usePermissions = () => {
    const user = useSupabaseUser();
    const userPermissions = useState<Permissions>(() => ({} as Permissions));
    onMounted(() => {
        if (user.value) {
            userPermissions.value.userId = user.value.id;
            userPermissions.value.adminRole = user.value.email ? adminUsers.includes(user.value.email) : false;
        }
    })
    
    return { userPermissions };
};