import { contacts } from "@/constants/contacts";
import ContactCard from "./ContactCard";

const Contact = () => {
  return (
    <section className="relative space-y-12 px-6 py-24">
      <h4 className="h3-bold md:mx-auto md:max-w-[850px] md:text-center">
        Connect with <span className="text-yellow-600">ADSC</span> for guidance, collaboration, or to join our mission!
      </h4>

      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            title={contact.title}
            description={contact.description}
            icon={contact.icon}
            path={contact.path}
          />
        ))}
      </div>
    </section>
  );
};
export default Contact;
