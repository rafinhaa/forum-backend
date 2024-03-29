import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { SendNotificationUseCase } from "../send-notification";
import { InMemoryNotificationsRepository } from "__tests__/repositories/in-memory-notifications-repository";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe("Send Notification", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
  });

  it("should be able to send a notification", async () => {
    const result = await sut.execute({
      recipientId: "1",
      title: "Nova notificação",
      content: "Conteúdo da notificação",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.notification.id).toBeTruthy();
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification
    );
  });
});
