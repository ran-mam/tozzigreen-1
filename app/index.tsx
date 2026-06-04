// import LoginScreen from '@/screens/LoginScreen';

// export default function Index() {
//   return <LoginScreen />;
// }

import { Redirect } from 'expo-router';

export default function Index() {
    return <Redirect href="/login" />;
}