// src/Hooks/useClubs.ts

import { useQuery } from '@tanstack/react-query'; 
import type { Club, ApiResponse, ApiClubData , ClubType } from '../types/club'; 
import axios from '../utils/axios'; 

interface ClubFilterParams {
  type?: string;
  category?: string;
  isRecruiting?: boolean;
  department?: string;
  sort?: 'recent' | 'alphabetical';
}

const applyClientFilters = (clubs: ApiClubData[], filters: ClubFilterParams): ApiClubData[] => {
  const { type, category, department, isRecruiting } = filters;

  return clubs.filter((club) => {
    if (type && club.clubType !== type) return false;
    if (category && club.category !== category) return false;
    if (department && department !== '전체') {
      const target = club.recruitmentTarget ?? '';
      if (target !== department) return false;
    }
    if (isRecruiting === true && club.recruiting !== true) return false;
    return true;
  });
};


const mapApiClubToClub = (apiClub: ApiClubData): Club => {
  return {
    clubId: apiClub.id,
    clubName: apiClub.name,
    clubType: apiClub.clubType as ClubType,
    profileImageUrl: apiClub.logoUrl,
    description: apiClub.description,
    category: apiClub.category,
    isRecruiting: apiClub.recruiting,
    mainActivities: null,
    location: null,
    contactPhoneNumber: null,
    instagramUrl: null,
    youtubeUrl: null,
    linktreeUrl: null,
    clubUrl: null,
    contactEmail: null,
    createdAt: '', 
    updatedAt: '',
    details: null,
    //recruitmentTarget: apiClub.recruitmentTarget || null,
  };
};


const fetchClubs = async (filters: ClubFilterParams): Promise<Club[]> => {
  
  //const { sort, isRecruiting, department, category, type } = filters;
  const { isRecruiting, department, category, type } = filters;
  const apiParams: Record<string, any> = {};
  if (type) apiParams.type = type;
  if (category) apiParams.category = category;
  if (department && department !== '전체') apiParams.department = department;
  if (isRecruiting === true) apiParams.isRecruiting = true; // 모집 중일 때만 필터 적용
  const hasFilters = Object.values(apiParams).some(val => val !== undefined);

  let response;
  if (hasFilters) {
    try {
      response = await axios.get<ApiResponse<ApiClubData[]>>('/api/club/filter', {
        params: apiParams,
      });
    } catch {
      // Some filter combinations intermittently fail on the filter endpoint.
      // Fallback to /all and apply identical filtering on the client.
      const allResponse = await axios.get<ApiResponse<ApiClubData[]>>('/api/club/all');
      if (allResponse.data.status !== 200) {
        throw new Error(allResponse.data.message || 'Failed to fetch clubs');
      }
      return applyClientFilters(allResponse.data.data, filters).map(mapApiClubToClub);
    }
  } else {
    response = await axios.get<ApiResponse<ApiClubData[]>>('/api/club/all');
  }

  if (response.data.status !== 200) {
    throw new Error(response.data.message || 'Failed to fetch clubs');
  }

  return response.data.data.map(mapApiClubToClub);
};


const useClubs = (filters: ClubFilterParams = {}) => {
  
  const { sort, ...realFilters } = filters;
  
  const { 
    data: clubs = [], 
    isLoading, 
    error 
  } = useQuery<Club[], Error>({
    
    queryKey: ['clubs', realFilters], 

    queryFn: () => fetchClubs(realFilters),
  });

  return { clubs, isLoading, error };
};

export default useClubs;
