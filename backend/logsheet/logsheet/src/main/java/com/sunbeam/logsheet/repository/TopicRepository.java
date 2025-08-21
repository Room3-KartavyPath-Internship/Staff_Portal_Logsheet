package com.sunbeam.logsheet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sunbeam.logsheet.entity.Topic;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
}
