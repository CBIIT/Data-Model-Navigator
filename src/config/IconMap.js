import AdministrativeSvg from '../assets/icons/administrative.svg';
import AdministrativeSvgRounded from '../assets/icons/administrative_rounded.svg';
import AdministrativePng from '../assets/icons/administrative.png';
import AnalysisSvg from '../assets/icons/analysis.svg';
import AnalysisSvgRounded from '../assets/icons/analysis_rounded.svg';
import AnalysisPng from '../assets/icons/analysis.png';
import BiospecimenSvg from '../assets/icons/biospecimen.svg';
import BiospecimenSvgRounded from '../assets/icons/biospecimen_rounded.svg';
import BiospecimenPng from '../assets/icons/biospecimen.png';
import CaseSvg from '../assets/icons/case.svg';
import CaseSvgRounded from '../assets/icons/case_rounded.svg';
import CasePng from '../assets/icons/case.png';
import ClinicalTrialSvg from '../assets/icons/clinical_trial.svg';
import ClinicalTrialSvgRounded from '../assets/icons/clinical_trial_rounded.svg';
import ClinicalTrialPng from '../assets/icons/clinical_trial.png';
import ClinicalSvg from '../assets/icons/clinical.svg';
import ClinicalSvgRounded from '../assets/icons/clinical_rounded.svg';
import ClinicalPng from '../assets/icons/clinical.png';
import DataFileSvg from '../assets/icons/data_file.svg';
import DataFileSvgRounded from '../assets/icons/data_file_rounded.svg';
import DataFilePng from '../assets/icons/data_file.png';
import ImagingSvg from '../assets/icons/imaging.svg';
import ImagingPng from '../assets/icons/imaging.png';
import NotationSvg from '../assets/icons/notation.svg';
import NotationPng from '../assets/icons/notation.png';
import ParticipantSvg from '../assets/icons/participant.svg';
import ParticipantPng from '../assets/icons/participant.png';
import StudySvg from '../assets/icons/study.svg';
import StudySvgRounded from '../assets/icons/study_rounded.svg';
import StudyPng from '../assets/icons/study.png';
import DefaultSvg from '../assets/icons/default.svg';
import DefaultPng from '../assets/icons/default.png';

/**
 * A mapping of icon names to their SVG and PNG representations, along with color and background properties.
 * 
 * @note For backwards compatibility, the initial icon names match the category mappings.
 * 
 * @typedef {Object} IconConfig
 * @property {string} svg - The path to the SVG icon.
 * @property {string} svg_rounded - The path to the rounded SVG icon, or the same as `svg` if not available. Used for the graph view.
 * @property {string} png - The path to the PNG icon
 * @property {string} color - The primary color associated with the icon.
 * @property {string} background - The background color associated with the icon.
 */
export const IconMap = {
  "administrative": {
    "svg": AdministrativeSvg,
    "svg_rounded": AdministrativeSvgRounded,
    "png": AdministrativePng,
    "color": "#9C2E1F",
    "background": "#691706",
  },
  "analysis": {
    "svg": AnalysisSvg,
    "svg_rounded": AnalysisSvgRounded,
    "png": AnalysisPng,
    "color": "#B533A9",
    "background": "#6F0065",
  },
  "biospecimen": {
    "svg": BiospecimenSvg,
    "svg_rounded": BiospecimenSvgRounded,
    "png": BiospecimenPng,
    "color": "#00785A",
    "background": "#063126",
  },
  "case": {
    "svg": CaseSvg,
    "svg_rounded": CaseSvgRounded,
    "png": CasePng,
    "color": "#FF7E14",
    "background": "#672900",
  },
  "clinical_trial": {
    "svg": ClinicalTrialSvg,
    "svg_rounded": ClinicalTrialSvgRounded,
    "png": ClinicalTrialPng,
    "color": "#00A0BA",
    "background": "#043F55",
  },
  "clinical": {
    "svg": ClinicalSvg,
    "svg_rounded": ClinicalSvgRounded,
    "png": ClinicalPng,
    "color": "#1C75BB",
    "background": "#073A61",
  },
  "data_file": {
    "svg": DataFileSvg,
    "svg_rounded": DataFileSvgRounded,
    "png": DataFilePng,
    "color": "#00AC0E",
    "background": "#023806",
  },
  "imaging": {
    "svg": ImagingSvg,
    "svg_rounded": ImagingSvg,
    "png": ImagingPng,
    "color": "#7EC500",
    "background": "#023806",
  },
  "notation": {
    "svg": NotationSvg,
    "svg_rounded": NotationSvg,
    "png": NotationPng,
    "color": "#E74C3C",
    "background": "#d74030",
  },
  "participant": {
    "svg": ParticipantSvg,
    "svg_rounded": ParticipantSvg,
    "png": ParticipantPng,
    "color": "#9875FF",
    "background": "#4D31A2",
  },
  "study": {
    "svg": StudySvg,
    "svg_rounded": StudySvgRounded,
    "png": StudyPng,
    "color": "#9775FF",
    "background": "#4D31A2",
  }
};

/**
 * A default icon configuration used when no specific icon is available.
 */
export const DefaultIcon = {
  "svg": DefaultSvg,
  "svg_rounded": DefaultSvg,
  "png": DefaultPng,
  "color": "#9B9B9B",
  "background": "#7a7a7a"
};
