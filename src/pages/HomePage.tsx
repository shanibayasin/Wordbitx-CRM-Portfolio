import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { TrustStrip } from '../components/sections/TrustStrip';
import { CustomerJourneySection } from '../components/sections/CustomerJourneySection';
import { CrmOverviewSection } from '../components/sections/CrmOverviewSection';
import { LeadManagementSection } from '../components/sections/LeadManagementSection';
import { SalesPipelineSection } from '../components/sections/SalesPipelineSection';
import { DealManagementSection } from '../components/sections/DealManagementSection';
import { ContactManagementSection } from '../components/sections/ContactManagementSection';
import { CallCenterSection } from '../components/sections/CallCenterSection';
import { CustomerSupportSection } from '../components/sections/CustomerSupportSection';
import { AutomationSection } from '../components/sections/AutomationSection';
import { AiCrmSection } from '../components/sections/AiCrmSection';
import { AnalyticsSection } from '../components/sections/AnalyticsSection';
import { TeamManagementSection } from '../components/sections/TeamManagementSection';
import { RbacMatrixSection } from '../components/sections/RbacMatrixSection';
import { CalendarTasksSection } from '../components/sections/CalendarTasksSection';
import { ActivityTimelineSection } from '../components/sections/ActivityTimelineSection';
import { IntegrationsSection } from '../components/sections/IntegrationsSection';
import { ApiDeveloperSection } from '../components/sections/ApiDeveloperSection';
import { SecuritySection } from '../components/sections/SecuritySection';
import { MultiWorkspaceSection } from '../components/sections/MultiWorkspaceSection';
import { SolutionsSection } from '../components/sections/SolutionsSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { PricingSection } from '../components/sections/PricingSection';
import { FaqSection } from '../components/sections/FaqSection';
import { FinalCtaSection } from '../components/sections/FinalCtaSection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 3. Hero + 4. Interactive CRM Preview */}
      <HeroSection />

      {/* 5. Trust / Capability Strip */}
      <TrustStrip />

      {/* 6. Unified Customer Journey */}
      <CustomerJourneySection />

      {/* 7. CRM Overview */}
      <CrmOverviewSection />

      {/* 8. Lead Management */}
      <LeadManagementSection />

      {/* 9. Sales Pipeline */}
      <SalesPipelineSection />

      {/* 10. Deal Management */}
      <DealManagementSection />

      {/* 11. Customer & Contact Management */}
      <ContactManagementSection />

      {/* 12. Call Center */}
      <CallCenterSection />

      {/* 13. Customer Support */}
      <CustomerSupportSection />

      {/* 14. Automation */}
      <AutomationSection />

      {/* 15. AI CRM */}
      <AiCrmSection />

      {/* 16. Analytics */}
      <AnalyticsSection />

      {/* 17. Team Management */}
      <TeamManagementSection />

      {/* 18. Role-Based Access (RBAC) */}
      <RbacMatrixSection />

      {/* 19. Calendar & Tasks */}
      <CalendarTasksSection />

      {/* 20. Activity Timeline */}
      <ActivityTimelineSection />

      {/* 21. Integrations */}
      <IntegrationsSection />

      {/* 22. API & Developer Platform */}
      <ApiDeveloperSection />

      {/* 23. Security */}
      <SecuritySection />

      {/* 24. Multi-Tenant Workspace */}
      <MultiWorkspaceSection />

      {/* 25. Solutions */}
      <SolutionsSection />

      {/* 26. Testimonials */}
      <TestimonialsSection />

      {/* 27. Pricing Preview */}
      <PricingSection />

      {/* 28. FAQ Preview */}
      <FaqSection />

      {/* 29. Final CTA */}
      <FinalCtaSection />
    </div>
  );
};
