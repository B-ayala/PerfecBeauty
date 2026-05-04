import { Box } from '@mui/material';
import {
  BenefitsSection,
  BookingCta,
  ContactSection,
  Hero,
  ProfessionalsSection,
  ServicesSection,
  TestimonialsSection,
} from '@/components/sections';

export const LandingPage = () => (
  <Box component="main">
    <Hero />
    <ServicesSection />
    <BenefitsSection />
    <ProfessionalsSection />
    <TestimonialsSection />
    <BookingCta />
    <ContactSection />
  </Box>
);
