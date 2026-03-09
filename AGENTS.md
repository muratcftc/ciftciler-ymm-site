# Çiftçiler YMM Website Agent Guide

## Project identity
This project is the public website of Çiftçiler Yeminli Mali Müşavirlik A.Ş.

The website must present the firm as:
- trustworthy
- expert
- precise
- corporate
- modern but restrained
- conversion-oriented

The primary business goal is to collect qualified offer requests from potential clients.

## Main objectives
1. Build a clean, premium, high-trust corporate website.
2. Convert visitors into qualified leads through structured quote forms.
3. Support future SEO growth through article and circular content.
4. Explain complex tax services in a clear and professional way.
5. Keep the structure scalable and easy to maintain.

## Language
- Default language: Turkish
- Write natural, professional, clear Turkish
- Avoid generic agency-style marketing language
- Avoid exaggerated or unverifiable claims

## Target audiences
The website mainly targets:
- companies needing tam tasdik
- companies seeking KDV iadesi tasdik services
- companies needing tax advisory
- companies under tax inspection or tax dispute pressure
- companies evaluating tax incentives or restructuring decisions

## Brand positioning
The firm should be positioned as:
- a reliable long-term solution partner
- a technically strong YMM office
- a practice that balances legislation, implementation, and process management
- a team that understands both compliance and business realities

## Visual direction
Use a visual language inspired by the proposal document:
- dark blue / deep teal
- muted light gray background
- strong red accent
- high whitespace
- strong headings
- restrained premium layout
- corporate editorial feel

Do not create flashy startup aesthetics.
Do not use excessive gradients, glassmorphism, or playful illustrations.

## Core pages
The first release should include:
- Home
- Services
- About
- Circulars / Articles
- Contact
- Get a Quote

## Home page priorities
The homepage should:
1. explain what the firm does
2. establish trust quickly
3. highlight main services
4. present expertise and approach
5. direct users to quote request and contact actions
6. surface SEO-oriented circular/article content

## Services
Main services should include at least:
- Tam Tasdik Hizmetleri
- KDV İadesi Tasdik Hizmetleri
- Vergi İncelemelerine İlişkin Danışmanlık
- Vergi Dava Süreç Takibi ve Yönetimi
- Vergisel Teşvikler ve Yapılandırma Danışmanlığı
- Yönetim ve Vergi Danışmanlığı

## Quote flow requirements
The quote page is a major feature.

It must support:
- service selection first
- service-specific follow-up questions
- qualified lead collection instead of a generic contact form

Examples:
- If the user selects Tam Tasdik, ask company size, turnover band, sector, group company status, current accounting structure, and expected service year.
- If the user selects KDV İadesi, ask refund type, frequency, approximate volume, export/manufacturing status, and prior refund process details.
- If the user selects Tax Advisory, ask scope, urgency, sector, and decision topic.

The form should be modular and extendable.

## SEO and content strategy
The website must be ready for:
- circular posts about tax and legislation updates
- soft educational articles that attract potential clients
- service-focused landing pages in the future

Important:
- Structure pages with proper heading hierarchy
- Include metadata-friendly titles and descriptions
- Add internal linking opportunities
- Keep content readable and useful

## Content style rules
- Use short and strong headings
- Prefer clarity over ornament
- Explain technical services in understandable language
- Keep paragraphs short
- Avoid filler sentences
- Add clear CTAs in strategic sections
- Write with confidence but not arrogance

## Technical preferences
- Framework: Astro
- Prefer static-first architecture
- Keep components reusable
- Keep file structure readable
- Optimize for performance and SEO
- Use modular content sections
- Avoid unnecessary JavaScript unless interaction is required

## Form implementation guidance
- Start with a frontend-only modular form UI
- Structure code so backend/email integration can be added later
- Keep validation readable and extensible
- Separate service question sets from form rendering logic when possible

## Workflow rules
- Before major changes, briefly explain the plan
- Prefer small and reviewable edits
- Preserve architectural clarity
- Ask for approval before major structure changes
- When uncertain about business content, ask the user

## Output style for coding tasks
When making changes:
1. State which files will be created or changed
2. Apply the change
3. Summarize what was done
4. Suggest the next logical step