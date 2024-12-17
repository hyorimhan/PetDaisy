import { deleteVaccination } from "@/service/vaccine";
import useModalStore from "@/zustand/useModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useDeleteVaccine() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const { mutate: deleteVaccine } = useMutation({
    mutationFn: (vaccineId: string) => deleteVaccination(vaccineId),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["vaccineList"] }),
    onSuccess: () => {
      openModal({
        type: "success",
        title: "기록 삭제 완료",
        content: "기록이 삭제되었습니다.",
        onConfirm: () => closeModal(),
      });
      router.push("/dashboard/vaccineList");
    },
  });
  const handleDeleteVaccine = (vaccineId: string) => {
    openModal({
      type: "warning",
      title: "기록 삭제",
      content: "기록을 삭제하시겠습니까?",
      isTwoButton: true,
      onConfirm: () => deleteVaccine(vaccineId),
      onCancel: () => closeModal(),
    });
  };
  return { handleDeleteVaccine };
}
