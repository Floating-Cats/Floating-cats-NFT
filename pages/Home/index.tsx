// page components
import FCAbout from 'components/FCHome/FCAbout';
import FCBanner from 'components/FCHome/FCBanner';
import FCBgCloud from 'components/FCHome/FCBgCloud';
import FCDNA from 'components/FCHome/FCDNA';
import FCFAQ from 'components/FCHome/FCFAQ';
import FCRoadmap from 'components/FCHome/FCRoadmap';
import FCTeam from 'components/FCHome/FCTeam';

export default function Home(): JSX.Element {
  return (
    <>
      <FCBgCloud />
      <FCBanner />
      <FCAbout />
      <FCRoadmap />
      <FCDNA />
      <FCFAQ />
      <FCTeam />
    </>
  );
}
