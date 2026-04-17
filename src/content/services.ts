import service01 from "../assets/gallery/service-01.webp";
import service02 from "../assets/gallery/service-02.webp";
import heroWeldingShot from "../assets/gallery/hero-welding-shot.jpg";
import skidSteer from "../assets/gallery/skid-steer.jpg";
import aluminumFab from "../assets/gallery/aluminum-fabrication.jpg";
import stainlessSteel from "../assets/gallery/stainless-steel-tube-tig-welded.jpg";
import plateWeld1 from "../assets/gallery/plate-weld-1.jpg";
import handrail from "../assets/gallery/handrail.jpg";
import truckBumperBroken from "../assets/gallery/damaged-bumper.jpg";

export const services = [
  {
    id: 'mobile-welding',
    title: 'MOBILE WELDING REPAIR',
    description: 'Bringing industrial-grade welding directly to your location. Our fully equipped mobile rigs are prepared for emergency structural repairs or scheduled maintenance without the need for hauling equipment.',
    bullets: [
      'Emergency structural frame repair and reinforcement',
      'On-site heavy equipment bucket and arm crack repair',
      'Fixed structure and agricultural equipment maintenance'
    ],
    image: service01
  },
  {
    id: 'trailer-repair',
    title: 'TRAILER REPAIR',
    description: 'Complete overhaul and structural restoration for utility, dump, and commercial trailers. We focus on DOT compliance and long-term durability for heavy-haul conditions.',
    bullets: [
      'Axle replacement and hanger re-alignment',
      'Jack, coupler, and safety chain installation',
      'Deck replacement and cross-member reinforcement'
    ],
    image: service02
  },
  {
    id: 'truck-vehicle',
    title: 'TRUCK AND VEHICLE BODY',
    description: 'Structural reinforcement and custom fabrication for work trucks, fleet vehicles, and specialized rigs. Every weld meets DOT and safety compliance standards.',
    bullets: [
      'Frame and chassis reinforcement',
      'Custom toolbox, rack, and bumper mounts',
      'Rust repair and body panel replacement'
    ],
    image: heroWeldingShot
  },
  {
    id: 'equipment-machinery',
    title: 'EQUIPMENT AND MACHINERY',
    description: 'Hardfacing, wear plate replacement, and structural repair for construction, agricultural, and industrial equipment. Fast turnaround to minimize downtime.',
    bullets: [
      'Excavator bucket and arm crack repair',
      'Wear plate and cutting edge replacement',
      'Hydraulic cylinder mount repair'
    ],
    image: skidSteer
  },
  {
    id: 'aluminum-welding',
    title: 'ALUMINUM WELDING',
    description: 'Precision aluminum welding for marine, automotive, and fabrication applications. We handle thin sheet through structural plate with consistent penetration and clean beads.',
    bullets: [
      'Marine fuel tanks and hull repair',
      'Aluminum trailer and utility body work',
      'Custom aluminum bracket fabrication'
    ],
    image: aluminumFab
  },
  {
    id: 'stainless-steel',
    title: 'STAINLESS STEEL WELDING',
    description: 'Sanitary, food-grade, and architectural stainless welding with back-purged TIG for code-compliant results. Suitable for commercial kitchens, railings, and pipeline work.',
    bullets: [
      'Food-grade pipeline and tank welding',
      'Architectural railings and guards',
      'Chemical-resistant enclosures'
    ],
    image: stainlessSteel
  },
  {
    id: 'custom-fabrication',
    title: 'CUSTOM FABRICATION',
    description: 'Engineering custom solutions from raw steel, aluminum, and stainless. From blueprint to final finish, we execute one-off prototypes or production runs with absolute accuracy.',
    bullets: [
      'Custom brackets, mounts, and structural supports',
      'Specialized industrial tooling and workstations',
      'Marine-grade components and mounting solutions'
    ],
    image: plateWeld1
  },
  {
    id: 'railings-gates',
    title: 'RAILINGS AND GATES',
    description: 'Ornamental and functional railings, gates, and guard rails for residential, commercial, and industrial sites. Built to code and built to last.',
    bullets: [
      'Custom driveway and security gates',
      'Handrails and guard rails to OSHA spec',
      'Decorative fence and ornamental work'
    ],
    image: handrail
  },
  {
    id: 'cutting-drilling',
    title: 'CUTTING AND DRILLING',
    description: 'Precision plasma cutting, oxy-fuel cutting, and metal drilling services for raw material prep and on-site modifications.',
    bullets: [
      'Plasma and oxy-fuel plate cutting',
      'Precision hole drilling and reaming',
      'On-site modification and fitting'
    ],
    image: truckBumperBroken
  }
];
