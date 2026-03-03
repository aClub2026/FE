import { useQuery } from '@tanstack/react-query';
import axios from '../../../utils/axios';
import PeriodChip from '../../ui/Chip/Chip_period';
import DefaultImage from '../../../assets/img/Default_images.png';
import type { RecruitmentType } from '../../../types/recruit';

interface RecruitmentListItemProps {
  recruitmentId: number;
  clubLogoUrl?: string | null;
  recruitmentStatus: 'regular' | 'd-day' | 'end';
  recruitmentType: RecruitmentType;
  dDay?: number;
  title: string;
  viewCount?: number;
  saveCount: number;
  postedDate: string;
}

const fetchListItemThumbnail = async (recruitmentId: number): Promise<string[]> => {
  try {
    const res = await axios.get<string[]>(`/api/recruitments/${recruitmentId}/images`);
    return res.data;
  } catch {
    return [];
  }
};

const RecruitmentListItem = ({
  recruitmentId,
  clubLogoUrl,
  recruitmentStatus,
  recruitmentType,
  dDay,
  title,
  viewCount,
  saveCount,
  postedDate,
}: RecruitmentListItemProps) => {
  const { data: thumbnailImages } = useQuery<string[], Error>({
    queryKey: ['recruitmentThumbnail', recruitmentId],
    queryFn: () => fetchListItemThumbnail(recruitmentId),
    staleTime: Infinity,
  });

  const thumbnailUrl = thumbnailImages?.[0] || clubLogoUrl || DefaultImage;

  return (
    <div className="flex w-full bg-white p-4 gap-3 border-b border-gray-100">
      <img
        src={thumbnailUrl}
        alt={`${title} thumbnail`}
        className="w-[100px] h-[100px] object-cover rounded-[10px] border border-gray-100 flex-shrink-0"
        loading="lazy"
        decoding="async"
      />

      <div className="flex flex-col flex-grow justify-between">
        <div>
          <PeriodChip
            status={recruitmentStatus}
            recruitmentType={recruitmentType}
            dDay={dDay}
            size="medium"
          />

          <p className="mt-1 text-base font-medium text-gray-900 leading-[1.35] tracking-[-0.03em]">
            {title}
          </p>
        </div>

        <div className="flex justify-between items-center text-xs font-normal text-gray-300 leading-[1.4] tracking-[-0.02em]">
          <div className="flex gap-2">
            {viewCount !== undefined && <span>조회 {viewCount}</span>}
            <span>저장 {saveCount}</span>
          </div>
          <span>{postedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentListItem;
