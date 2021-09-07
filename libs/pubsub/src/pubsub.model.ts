/**
 * GCP Pub/Sub 설정
 */
export class PubsubConfig {
  // GCP 프로젝트 명
  projectId: string;
  // 토픽 명
  topic: string;
  // 구독 명
  subscription?: string;
}
