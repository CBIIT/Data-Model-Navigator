import { getIconDetails } from './iconUtils';
import { DefaultIcon, IconMap } from '../config/IconMap';

// Mock the IconMap module
jest.mock('../config/IconMap', () => ({
  DefaultIcon: {
    svg: 'default.svg',
    svg_rounded: 'default-rounded.svg',
    png: 'default.png',
    color: '#000000',
    background: '#FFFFFF',
  },
  IconMap: {
    clinical: {
      svg: 'clinical.svg',
      svg_rounded: 'clinical-rounded.svg',
      png: 'clinical.png',
      color: '#FF0000',
      background: '#FFCCCC',
    },
    biospecimen: {
      svg: 'biospecimen.svg',
      svg_rounded: 'biospecimen-rounded.svg',
      png: 'biospecimen.png',
      color: '#00FF00',
      background: '#CCFFCC',
    },
  },
}));

describe('getIconDetails', () => {
  describe('when category is invalid', () => {
    it('should return DefaultIcon when category is null', () => {
      const result = getIconDetails(null);
      expect(result).toEqual(DefaultIcon);
    });

    it('should return DefaultIcon when category is undefined', () => {
      const result = getIconDetails(undefined);
      expect(result).toEqual(DefaultIcon);
    });

    it('should return DefaultIcon when category is not a string', () => {
      const result = getIconDetails(123);
      expect(result).toEqual(DefaultIcon);
    });

    it('should return DefaultIcon when category is an empty string', () => {
      const result = getIconDetails('');
      expect(result).toEqual(DefaultIcon);
    });
  });

  describe('when no CategoryIconMap is provided', () => {
    it('should return icon details for a valid category', () => {
      const result = getIconDetails('clinical');
      expect(result).toEqual(IconMap.clinical);
    });

    it('should return DefaultIcon for an unknown category', () => {
      const result = getIconDetails('unknownCategory');
      expect(result).toEqual(DefaultIcon);
    });
  });

  describe('when CategoryIconMap is provided', () => {
    const customMap = {
      customCategory: 'clinical',
      anotherCategory: 'biospecimen',
    };

    it('should use the custom map to retrieve icon details', () => {
      const result = getIconDetails('customCategory', customMap);
      expect(result).toEqual(IconMap.clinical);
    });

    it('should return DefaultIcon if category is not in the custom map', () => {
      const result = getIconDetails('unknownCategory', customMap);
      expect(result).toEqual(DefaultIcon);
    });

    it('should return DefaultIcon if mapped icon name does not exist in IconMap', () => {
      const mapWithInvalidIcon = { someCategory: 'nonExistentIcon' };
      const result = getIconDetails('someCategory', mapWithInvalidIcon);
      expect(result).toEqual(DefaultIcon);
    });
  });

  describe('edge cases', () => {
    it('should handle CategoryIconMap as an empty object', () => {
      const result = getIconDetails('clinical', {});
      expect(result).toEqual(DefaultIcon);
    });

    it('should handle CategoryIconMap as null explicitly', () => {
      const result = getIconDetails('clinical', null);
      expect(result).toEqual(IconMap.clinical);
    });
  });
});
