import React, { useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import { motion, useScroll } from 'framer-motion';

const BranchContainer = styled.section`
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 100px 2rem;
  min-height: 200vh; /* Make it tall enough to scroll through */
  display: grid;
  grid-template-columns: 1fr 100px 1fr; /* Left content, Center SVG, Right content */
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack on mobile */
    min-height: auto;
  }
`;

const CentralLineContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    display: none; /* Hide the complex line on mobile for a cleaner stack */
  }
`;

// A sticky wrapper so the SVG stays in view as you scroll past the content
const SvgWrapper = styled.div`
  position: sticky;
  top: 20vh;
  width: 100px;
  height: 60vh;
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15vh; /* Space out the items so the line has time to draw */
  padding-top: 30vh; /* Push content down so the trunk draws first */
`;

const LeftColumn = styled(ContentColumn)`
  align-items: flex-end;
  text-align: right;
`;

const RightColumn = styled(ContentColumn)`
  align-items: flex-start;
  text-align: left;
`;

const NodeBlock = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondaryBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;
  
  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    text-transform: uppercase;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const BranchingSection = () => {
  const containerRef = useRef(null);
  const theme = useTheme();

  // Track the scroll progress of this specific container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"] // Starts drawing when top hits center of screen
  });

  return (
    <BranchContainer ref={containerRef} id="branching">
      
      {/* LEFT BRANCH: Software & Cybersecurity */}
      <LeftColumn>
        <NodeBlock
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }} /* Triggers when line gets close */
        >
          <h3>Lively-Events Assessment</h3>
          <p>Full penetration test and security assessment simulating real-world threat vectors on infrastructure.</p>
        </NodeBlock>
        
        <NodeBlock
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
        >
          <h3>Constituent Feedback App</h3>
          <p>Civic tech platform enabling citizens to track legislation and submit localized feedback directly to representatives.</p>
        </NodeBlock>
      </LeftColumn>

      {/* CENTER TRUNK & BRANCHES */}
      <CentralLineContainer>
        <SvgWrapper>
          <svg viewBox="0 0 100 1000" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            {/* Left Branch Path */}
            <motion.path
              d="M 50 0 L 50 300 C 50 400, 10 450, 10 1000"
              stroke={theme.colors.textSecondary} /* Delicate Ink */
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
            {/* Right Branch Path */}
            <motion.path
              d="M 50 0 L 50 300 C 50 400, 90 450, 90 1000"
              stroke={theme.colors.textSecondary} /* Delicate Ink */
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
        </SvgWrapper>
      </CentralLineContainer>

      {/* RIGHT BRANCH: AI Governance & Philosophy */}
      <RightColumn>
        <NodeBlock
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
        >
          <h3>AI Safety in the Global South</h3>
          <p>Research proposal examining unique AI safety levers and regulatory frameworks outside Western hegemonies.</p>
        </NodeBlock>
        
        <NodeBlock
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
        >
          <h3>Nature of Consciousness</h3>
          <p>Long-form essay mapping emergent systems, language evolution, and the cultural architecture of mind.</p>
        </NodeBlock>
      </RightColumn>

    </BranchContainer>
  );
};

export default BranchingSection;
