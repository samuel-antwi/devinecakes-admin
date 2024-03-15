
interface Permissions {
    userId: string;
    adminRole: boolean;
}


export const usePermissions = () => {
    const user = useSupabaseUser();
    const userPermissions = useState<Permissions>(() => ({} as Permissions));
    onMounted(() => {
        if (user.value) {
            userPermissions.value.userId = user.value.id;
            userPermissions.value.adminRole = user.value.email === "antwisam80@gmail.com"
        }
    })
    
    return { userPermissions };
};