import { apiRequest } from '@/lib/api-request'

export type FeedbackType = 'feedback' | 'bug' | 'help' | 'feature_request'

export type SubmitFeedbackPayload = {
  title: string
  message: string
  type?: FeedbackType | null
}

export type SubmitFeedbackResponse = {
  id: number
}

export async function submitFeedback(
  payload: SubmitFeedbackPayload,
): Promise<SubmitFeedbackResponse> {
  return apiRequest<SubmitFeedbackResponse>('/api/feedback', {
    method: 'POST',
    body: {
      title: payload.title,
      message: payload.message,
      ...(payload.type != null ? { type: payload.type } : {}),
    },
    auth: true,
  })
}
