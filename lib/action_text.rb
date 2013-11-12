# module that provides translations for common actions (create/update etc)
module ActionText

  def action_text(action, model_or_instance, count = 1)
    model = model_or_instance.is_a?(Class) ? model_or_instance : model_or_instance.class
    t("helpers.actions.#{action}", :model => model.model_name.human(:count => count))
  end

  def action_path(action, model_or_instance)
    model = model_or_instance.is_a?(Class) ? model_or_instance : model_or_instance.class
    path_method_name = "#{model.model_name.underscore}_path"
    path_method_name = "#{action}_#{path_method_name}" unless action.to_s == 'show'
    if model_or_instance.is_a?(Class)
      Rails.application.routes.url_helpers.send(path_method_name)
    else
      Rails.application.routes.url_helpers.send(path_method_name, model_or_instance)
    end
  end

  def successfully_left_text(model_or_instance)
    action_text :successful_leave, model_or_instance
  end

  def successfully_created_text(model_or_instance)
    action_text :successful_creation, model_or_instance
  end

  def successfully_updated_text(model_or_instance)
    action_text :successful_update, model_or_instance
  end

  def could_not_create_text(model_or_instance)
    action_text :could_not_create, model_or_instance
  end

  def could_not_update_text(model_or_instance)
    action_text :could_not_update, model_or_instance
  end

end
