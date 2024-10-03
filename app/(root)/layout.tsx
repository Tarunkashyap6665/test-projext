import ImageProvider from '@/components/shared/context/ImageProvider';
import { Footer } from '@/components/shared/Footer'
import { NavigationBar } from '@/components/shared/NavigationBar'
import { Toaster } from '@/components/ui/toaster';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';

const Layout = async ({ children, model }: Readonly<{ children: React.ReactNode, model: React.ReactNode }>) => {

    const authUser = auth();
    let user;
    if (authUser.userId) {
        user = await getUserById(authUser.userId);

    }

    return (
        <>
            <ImageProvider>
                <NavigationBar user={user} />
                <main className="">

                    {children}
                    {model}

                </main>
                <Toaster />
                <Footer />
            </ImageProvider>
        </>
    )
}

export default Layout