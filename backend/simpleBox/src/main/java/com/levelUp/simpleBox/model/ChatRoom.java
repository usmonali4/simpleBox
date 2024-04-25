package com.levelUp.simpleBox.model;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "chats")
public class ChatRoom {
    @Id
    private ObjectId id;
    private List<ObjectId> members;
    private List<Message> messages;
}
