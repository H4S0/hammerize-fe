import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Copy, TextAlignJustify, Trash } from 'lucide-react';
import { deleteSummary } from '@/utils/api/summary';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { isApiResponse } from '@/utils/axios-config/axios';

type SummaryActiondDropdownProps = {
  summaryId: string;
  chatId: string;
  canDelete?: boolean;
  summaryText: string;
};

const SummaryActionDropdown = ({
  summaryId,
  chatId,
  canDelete,
  summaryText,
}: SummaryActiondDropdownProps) => {
  const queryClient = useQueryClient();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      toast.success('Copied to clipboard');
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <TextAlignJustify />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" sideOffset={5}>
        <DropdownMenuLabel>Summary information card</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-between" onClick={handleCopy}>
          Copy summary text <Copy />
        </DropdownMenuItem>
        {canDelete && (
          <DropdownMenuItem
            className="justify-between"
            onClick={async () => {
              try {
                const res = await deleteSummary(summaryId);
                toast.success(res.message);
                queryClient.invalidateQueries({
                  queryKey: ['summaries-by-chat', chatId],
                });
              } catch (err) {
                if (isApiResponse(err)) {
                  const apiError = err;

                  toast.error(
                    apiError.message || 'Something went wrong please try again'
                  );
                } else {
                  toast.error(
                    'Something went wrong please,check your connection'
                  );
                }
              }
            }}
          >
            Delete summary <Trash />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SummaryActionDropdown;
