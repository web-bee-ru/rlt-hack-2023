import { PropChildren } from '@/src/types/UtilityProps';
import dynamic from 'next/dynamic';

// Disables SSR
const SafeHydrate = dynamic(() => Promise.resolve(({ children }: PropChildren) => <>{children}</>), { ssr: false });

export default SafeHydrate;
